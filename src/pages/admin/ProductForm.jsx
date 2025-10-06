/**
 * ProductForm Component
 *
 * Form for creating and editing products
 */

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductsStore } from '../../stores/useProductsStore';
import { graniteTypes } from '../../constants/graniteData';
import { surfaceFinishTypes, combinedFinishTypes } from '../../constants/productsData';
import { generateFinishDescription, parseFinishType } from '../../utils/finishTypeUtils';
import ImageUploadField from '../../components/admin/common/ImageUploadField/ImageUploadField';
import styles from '../../components/admin/products/ProductForm.module.scss';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct } = useProductsStore();

  const isEditMode = Boolean(id);

  // Створюємо список всіх доступних текстур для dropdown
  const allTextures = useMemo(() => {
    const textures = [];
    graniteTypes.forEach(type => {
      if (type.textures) {
        type.textures.forEach(texture => {
          textures.push({
            id: texture.id,
            name: texture.name.ua,
            groupName: type.name.ua
          });
        });
      }
    });
    return textures;
  }, []);

  // (allFinishTypes більше не потрібен - використовуємо нову логіку surfaceProcessing)
  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Стан для характеристик обробки (замість finishType)
  const [surfaceProcessing, setSurfaceProcessing] = useState({
    sawnSides: 6,       // Пиляна сторін (основне поле)
    splitSides: 0,      // Колота сторін (автоматично = 6 - sawnSides)
    thermalTop: false   // Термообробка верху
  });

  // Стан для цін БЕЗ валюти (тільки числа)
  const [priceValues, setPriceValues] = useState({
    ua: '',
    en: '',
    de: '',
    pl: ''
  });

  const [formData, setFormData] = useState({
    id: '',
    textureId: '',
    finishType: '',
    size: '', // Автоматично генерується з dimensions
    dimensions: {
      length: '',
      width: '',
      height: '',
      unit: 'мм'
    },
    price: {
      ua: '',
      en: '',
      de: '',
      pl: ''
    },
    image: '',
    name: {
      ua: '',
      en: '',
      de: '',
      pl: ''
    },
    description: {
      ua: '',
      en: '',
      de: '',
      pl: ''
    },
    features: {
      ua: [],
      en: [],
      de: [],
      pl: []
    },
    inStock: true,
    customizable: true
  });

  // Функція автоматичного визначення finishType на основі характеристик обробки
  const determineFinishType = (processing) => {
    const { sawnSides, splitSides, thermalTop } = processing;

    // Всі пиляні
    if (sawnSides === 6 && splitSides === 0) {
      return thermalTop ? 'sawn-thermal-top' : 'sawn';
    }

    // Всі колоті
    if (sawnSides === 0 && splitSides === 6) {
      return thermalTop ? 'thermal' : 'split';
    }

    // 2 пиляні + 4 колоті
    if (sawnSides === 2 && splitSides === 4) {
      return thermalTop ? 'split-sawn-thermal' : 'split-sawn';
    }

    // 4 пиляні + 2 колоті (завжди без термообробки - тип "з олівця")
    if (sawnSides === 4 && splitSides === 2) {
      return 'split-sawn-pencil';
    }

    // Для інших комбінацій (нестандартні: 1+5, 3+3, 5+1 тощо)
    if (thermalTop) {
      return 'mixed-thermal';
    }
    return 'mixed';
  };

  // Функція парсингу ціни (видалення валюти)
  const parsePrice = (priceString) => {
    if (!priceString) return '';
    // Витягуємо тільки числа (включаючи крапку для десяткових)
    // "1140 грн/м²" → "1140"
    // "21 €/m²" → "21"
    // "20 €/m² €/m² €/m²" → "20" (видаляє всі повтори)
    const match = priceString.toString().match(/[\d.]+/);
    return match ? match[0] : '';
  };

  // Функція форматування ціни (додавання валюти)
  const formatPrice = (value, lang) => {
    if (!value) return '';
    const numValue = value.toString().trim();
    if (lang === 'ua') {
      return `${numValue} грн/м²`;
    }
    // Для всіх інших мов використовуємо євро
    return `${numValue} €/m²`;
  };

  // Load product data if editing
  useEffect(() => {
    if (isEditMode) {
      const product = products.find(p => p.id === id);
      if (product) {
        setFormData(product);
        // Завантажуємо surfaceProcessing: спочатку перевіряємо чи є збережене поле,
        // інакше парсимо з finishType (для старих продуктів)
        if (product.surfaceProcessing) {
          setSurfaceProcessing({
            sawnSides: product.surfaceProcessing.sawnSides || 0,
            splitSides: product.surfaceProcessing.splitSides || 0,
            thermalTop: product.surfaceProcessing.thermalTop || false
          });
        } else if (product.finishType) {
          setSurfaceProcessing(parseFinishType(product.finishType));
        }
        // Парсимо ціни назад (видаляємо валюту)
        if (product.price) {
          setPriceValues({
            ua: parsePrice(product.price.ua || ''),
            en: parsePrice(product.price.en || ''),
            de: parsePrice(product.price.de || ''),
            pl: parsePrice(product.price.pl || '')
          });
        }
      }
    }
  }, [id, isEditMode, products]);

  // Auto-generate size from dimensions
  useEffect(() => {
    const { length, width, height } = formData.dimensions;

    if (length && width && height) {
      // Format: "paver_200x100x50"
      const generatedSize = `paver_${length}x${width}x${height}`;

      // Only update if different to avoid infinite loop
      if (formData.size !== generatedSize) {
        setFormData(prev => ({
          ...prev,
          size: generatedSize
        }));
        if (!isEditMode || formData.size) {
          // Only mark as changed if not in edit mode or if size was already set
          setHasChanges(true);
        }
      }
    } else {
      // Clear size if dimensions are incomplete
      if (formData.size) {
        setFormData(prev => ({
          ...prev,
          size: ''
        }));
      }
    }
  }, [formData.dimensions.length, formData.dimensions.width, formData.dimensions.height, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Автоматично визначаємо finishType та форматуємо ціни з валютою
      const finalFormData = {
        ...formData,
        finishType: determineFinishType(surfaceProcessing),
        surfaceProcessing: {
          sawnSides: surfaceProcessing.sawnSides,
          splitSides: surfaceProcessing.splitSides,
          thermalTop: surfaceProcessing.thermalTop
        },
        price: {
          ua: formatPrice(priceValues.ua, 'ua'),
          en: formatPrice(priceValues.en, 'en'),
          de: formatPrice(priceValues.de, 'de'),
          pl: formatPrice(priceValues.pl, 'pl')
        }
      };

      if (isEditMode) {
        await updateProduct(id, finalFormData);
        alert('Продукт успішно оновлено!');
      } else {
        await addProduct(finalFormData);
        alert('Продукт успішно створено!');
      }
      navigate('/admin/products');
    } catch (error) {
      alert('Помилка: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (window.confirm('Є незбережені зміни. Ви впевнені що хочете вийти?')) {
        navigate('/admin/products');
      }
    } else {
      navigate('/admin/products');
    }
  };

  const handleInputChange = (field, value) => {
    setHasChanges(true);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setHasChanges(true);
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  // Handler для зміни пиляних сторін (автоматично оновлює колоті)
  const handleSawnSidesChange = (value) => {
    setHasChanges(true);
    const sawnSides = Math.max(0, Math.min(6, Number(value))); // 0-6
    setSurfaceProcessing(prev => ({
      ...prev,
      sawnSides,
      splitSides: 6 - sawnSides
    }));
  };

  // Handler для термообробки верху
  const handleThermalTopChange = (checked) => {
    setHasChanges(true);
    setSurfaceProcessing(prev => ({
      ...prev,
      thermalTop: checked
    }));
  };

  // Handler для зміни цін (БЕЗ валюти)
  const handlePriceChange = (lang, value) => {
    setHasChanges(true);
    setPriceValues(prev => ({
      ...prev,
      [lang]: value
    }));
  };

  // Handler для features - додавання нової особливості
  const handleAddFeature = (lang) => {
    setHasChanges(true);
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [lang]: [...prev.features[lang], '']
      }
    }));
  };

  // Handler для features - видалення особливості
  const handleRemoveFeature = (lang, index) => {
    setHasChanges(true);
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [lang]: prev.features[lang].filter((_, i) => i !== index)
      }
    }));
  };

  // Handler для features - зміна тексту
  const handleFeatureChange = (lang, index, value) => {
    setHasChanges(true);
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [lang]: prev.features[lang].map((item, i) => i === index ? value : item)
      }
    }));
  };

  return (
    <div className={styles.productForm}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {isEditMode ? 'Редагувати Продукт' : 'Додати Новий Продукт'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Name Section - Найважливіше поле, на початку форми */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Назва (4 мови)</h2>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="name-ua">Назва (UA) *</label>
              <input
                type="text"
                id="name-ua"
                value={formData.name.ua}
                onChange={(e) => handleNestedChange('name', 'ua', e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="name-en">Name (EN) *</label>
              <input
                type="text"
                id="name-en"
                value={formData.name.en}
                onChange={(e) => handleNestedChange('name', 'en', e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="name-de">Name (DE) *</label>
              <input
                type="text"
                id="name-de"
                value={formData.name.de}
                onChange={(e) => handleNestedChange('name', 'de', e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="name-pl">Nazwa (PL) *</label>
              <input
                type="text"
                id="name-pl"
                value={formData.name.pl}
                onChange={(e) => handleNestedChange('name', 'pl', e.target.value)}
                required
              />
            </div>
          </div>
        </section>

        {/* Basic Info Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Основна Інформація</h2>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="id">ID *</label>
              <input
                type="text"
                id="id"
                value={formData.id}
                onChange={(e) => handleInputChange('id', e.target.value)}
                placeholder="paver-granite-200x100x50"
                required
                disabled={isEditMode}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="textureId">Текстура *</label>
              <select
                id="textureId"
                value={formData.textureId}
                onChange={(e) => handleInputChange('textureId', e.target.value)}
                required
              >
                <option value="">-- Оберіть текстуру --</option>
                {allTextures.map(texture => (
                  <option key={texture.id} value={texture.id}>
                    {texture.name} ({texture.id})
                  </option>
                ))}
              </select>
            </div>

            {/* Блок обробки поверхні */}
            <div className={styles.processingBlock}>
              <h3 className={styles.processingTitle}>Обробка Поверхні</h3>

              <div className={styles.processingFields}>
                <div className={styles.formGroup}>
                  <label htmlFor="thermalTop" className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      id="thermalTop"
                      checked={surfaceProcessing.thermalTop}
                      onChange={(e) => handleThermalTopChange(e.target.checked)}
                      style={{ marginRight: '0.5rem' }}
                    />
                    Термообробка верху
                  </label>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="sawnSides">Пиляна сторін *</label>
                  <input
                    type="number"
                    id="sawnSides"
                    value={surfaceProcessing.sawnSides}
                    onChange={(e) => handleSawnSidesChange(e.target.value)}
                    min="0"
                    max="6"
                    required
                  />
                  <small style={{ color: '#64748b', fontSize: '0.75rem' }}>
                    Значення від 0 до 6
                  </small>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="splitSides">Колота сторін (автоматично)</label>
                  <input
                    type="number"
                    id="splitSides"
                    value={surfaceProcessing.splitSides}
                    disabled
                    style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed' }}
                  />
                  <small style={{ color: '#64748b', fontSize: '0.75rem' }}>
                    Обчислюється як 6 - пиляна сторін
                  </small>
                </div>

                {/* Показуємо результат визначення finishType */}
                <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                  <div className={styles.finishTypeResult}>
                    📋 Тип обробки: <strong>{determineFinishType(surfaceProcessing)}</strong>
                    {' — '}
                    {generateFinishDescription(surfaceProcessing)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dimensions Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Розміри</h2>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="length">Довжина (мм) *</label>
              <input
                type="number"
                id="length"
                value={formData.dimensions.length}
                onChange={(e) => handleNestedChange('dimensions', 'length', Number(e.target.value))}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="width">Ширина (мм) *</label>
              <input
                type="number"
                id="width"
                value={formData.dimensions.width}
                onChange={(e) => handleNestedChange('dimensions', 'width', Number(e.target.value))}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="height">Висота (мм) *</label>
              <input
                type="number"
                id="height"
                value={formData.dimensions.height}
                onChange={(e) => handleNestedChange('dimensions', 'height', Number(e.target.value))}
                required
              />
            </div>

            {/* Auto-generated size field */}
            <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="size">Розмір (автоматично генерується)</label>
              <input
                type="text"
                id="size"
                value={formData.size || ''}
                disabled
                style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed', fontFamily: 'monospace' }}
              />
              <small style={{ color: '#64748b', fontSize: '0.75rem' }}>
                📏 Формат: paver_(довжина)x(ширина)x(висота) - генерується автоматично з розмірів
              </small>
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Зображення Продукту</h2>

          <ImageUploadField
            value={formData.image}
            onChange={(imageUrl) => {
              setHasChanges(true);
              handleInputChange('image', imageUrl);
            }}
            label="Зображення продукту"
            required={false}
          />
        </section>

        {/* Price Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Ціни (4 мови)</h2>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="price-ua">Ціна (UA, грн/м²) *</label>
              <input
                type="text"
                id="price-ua"
                value={priceValues.ua}
                onChange={(e) => handlePriceChange('ua', e.target.value)}
                placeholder="1140"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="price-en">Price (EN, €/m²) *</label>
              <input
                type="text"
                id="price-en"
                value={priceValues.en}
                onChange={(e) => handlePriceChange('en', e.target.value)}
                placeholder="21"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="price-de">Preis (DE, €/m²) *</label>
              <input
                type="text"
                id="price-de"
                value={priceValues.de}
                onChange={(e) => handlePriceChange('de', e.target.value)}
                placeholder="21"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="price-pl">Cena (PL, €/m²) *</label>
              <input
                type="text"
                id="price-pl"
                value={priceValues.pl}
                onChange={(e) => handlePriceChange('pl', e.target.value)}
                placeholder="21"
                required
              />
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Опис (4 мови)</h2>

          <div className={styles.formColumn}>
            <div className={styles.formGroup}>
              <label htmlFor="desc-ua">Опис (UA) *</label>
              <textarea
                id="desc-ua"
                value={formData.description.ua}
                onChange={(e) => handleNestedChange('description', 'ua', e.target.value)}
                rows="3"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="desc-en">Description (EN) *</label>
              <textarea
                id="desc-en"
                value={formData.description.en}
                onChange={(e) => handleNestedChange('description', 'en', e.target.value)}
                rows="3"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="desc-de">Beschreibung (DE) *</label>
              <textarea
                id="desc-de"
                value={formData.description.de}
                onChange={(e) => handleNestedChange('description', 'de', e.target.value)}
                rows="3"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="desc-pl">Opis (PL) *</label>
              <textarea
                id="desc-pl"
                value={formData.description.pl}
                onChange={(e) => handleNestedChange('description', 'pl', e.target.value)}
                rows="3"
                required
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Особливості (4 мови)</h2>

          <div className={styles.featuresContainer}>
            {/* UA Features */}
            <div className={styles.featureLanguageBlock}>
              <div className={styles.featureHeader}>
                <h3 className={styles.featureLanguageTitle}>🇺🇦 Українська</h3>
                <button
                  type="button"
                  onClick={() => handleAddFeature('ua')}
                  className={styles.addFeatureButton}
                >
                  + Додати
                </button>
              </div>
              {formData.features.ua.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange('ua', index, e.target.value)}
                    placeholder="Особливість продукту..."
                    className={styles.featureInput}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature('ua', index)}
                    className={styles.removeFeatureButton}
                    title="Видалити"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* EN Features */}
            <div className={styles.featureLanguageBlock}>
              <div className={styles.featureHeader}>
                <h3 className={styles.featureLanguageTitle}>🇬🇧 English</h3>
                <button
                  type="button"
                  onClick={() => handleAddFeature('en')}
                  className={styles.addFeatureButton}
                >
                  + Add
                </button>
              </div>
              {formData.features.en.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange('en', index, e.target.value)}
                    placeholder="Product feature..."
                    className={styles.featureInput}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature('en', index)}
                    className={styles.removeFeatureButton}
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* DE Features */}
            <div className={styles.featureLanguageBlock}>
              <div className={styles.featureHeader}>
                <h3 className={styles.featureLanguageTitle}>🇩🇪 Deutsch</h3>
                <button
                  type="button"
                  onClick={() => handleAddFeature('de')}
                  className={styles.addFeatureButton}
                >
                  + Hinzufügen
                </button>
              </div>
              {formData.features.de.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange('de', index, e.target.value)}
                    placeholder="Produktmerkmal..."
                    className={styles.featureInput}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature('de', index)}
                    className={styles.removeFeatureButton}
                    title="Entfernen"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* PL Features */}
            <div className={styles.featureLanguageBlock}>
              <div className={styles.featureHeader}>
                <h3 className={styles.featureLanguageTitle}>🇵🇱 Polski</h3>
                <button
                  type="button"
                  onClick={() => handleAddFeature('pl')}
                  className={styles.addFeatureButton}
                >
                  + Dodaj
                </button>
              </div>
              {formData.features.pl.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange('pl', index, e.target.value)}
                    placeholder="Cecha produktu..."
                    className={styles.featureInput}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature('pl', index)}
                    className={styles.removeFeatureButton}
                    title="Usuń"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stock Status */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Статус</h2>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) => handleInputChange('inStock', e.target.checked)}
                />
                {' '}В наявності
              </label>
            </div>

            <div className={styles.formGroup}>
              <label>
                <input
                  type="checkbox"
                  checked={formData.customizable}
                  onChange={(e) => handleInputChange('customizable', e.target.checked)}
                />
                {' '}Можливе замовлення
              </label>
            </div>
          </div>
        </section>

        {/* Form Actions */}
        <div className={styles.formActions}>
          <button
            type="button"
            onClick={handleCancel}
            className={styles.cancelButton}
            disabled={loading}
          >
            Скасувати
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Збереження...' : (isEditMode ? 'Оновити Продукт' : 'Створити Продукт')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
