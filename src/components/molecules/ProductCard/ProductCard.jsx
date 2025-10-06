import React from 'react';
import useLanguageStore from '../../../stores/languageStore';
import useGraniteSystemStore from '../../../stores/graniteSystemStore';
import { graniteTypes } from '../../../constants/graniteData';
import { surfaceFinishTypes, combinedFinishTypes } from '../../../constants/productsData';
import { generateFinishDescription, parseFinishType } from '../../../utils/finishTypeUtils';
import { createLocalizedPath } from '../../../utils/urlUtils';
import Button from '../../atoms/Button/Button';

const ProductCard = ({ product }) => {
  const { currentLanguage } = useLanguageStore();
  const { openGalleryAtTexture } = useGraniteSystemStore();

  // Convert production image path to dev path
  const getImagePath = (imagePath) => {
    if (!imagePath) return '';

    // If image is from uploads directory (backend), use full backend URL
    if (imagePath.startsWith('/uploads/')) {
      return `http://localhost:5000${imagePath}`;
    }

    // Remove /eurogranite-website prefix for dev server
    return imagePath.replace('/eurogranite-website', '');
  };

  // Отримуємо дані про текстуру граніту
  const textureData = graniteTypes.find(granite =>
    granite.textures.some(texture => texture.id === product.textureId)
  );
  const texture = textureData?.textures.find(t => t.id === product.textureId);

  // Отримуємо інформацію про тип обробки
  const getFinishInfo = (finishType) => {
    return surfaceFinishTypes[finishType] || combinedFinishTypes[finishType];
  };

  const finishInfo = getFinishInfo(product.finishType);

  // Генеруємо динамічний опис обробки
  const getFinishDescription = () => {
    // Спочатку перевіряємо чи є збережене surfaceProcessing
    if (product.surfaceProcessing) {
      return generateFinishDescription(product.surfaceProcessing);
    }
    // Інакше парсимо з finishType (для старих продуктів)
    if (product.finishType) {
      const processing = parseFinishType(product.finishType);
      return generateFinishDescription(processing);
    }
    // Fallback на статичну назву з константи
    return finishInfo?.name[currentLanguage] || '';
  };

  // Форматування розмірів
  const formatDimensions = (dimensions) => {
    if (dimensions.length === 'custom') {
      return currentLanguage === 'ua' ? 'Під замовлення' : 'Custom size';
    }
    // Розміри вже в мм
    return `${dimensions.length}×${dimensions.width}×${dimensions.height}мм`;
  };

  // Обробка кліку на текстуру
  const handleTextureClick = () => {
    if (product.textureId) {
      openGalleryAtTexture(product.textureId, graniteTypes);
    }
  };

  // Обробка кліку на замовлення
  const handleOrderClick = () => {
    // Перенаправлення на Contact сторінку з правильним мовним шляхом та focus параметром
    window.location.href = createLocalizedPath('contact', currentLanguage) + '?focus=form#contact-form';
  };

  // Check if image exists and is valid
  const hasImage = product.image && product.image.trim() !== '';
  const imageSrc = getImagePath(product.image);

  return (
    <div className="product-card">
      {/* Зображення продукту */}
      <div className="product-image-container">
        <div className="product-image-wrapper">
          {hasImage ? (
            <img
              src={imageSrc}
              alt={product.name[currentLanguage]}
              className="product-image"
              onError={(e) => {
                console.error('Image error:', imageSrc);
                // Only show placeholder if image truly fails
                e.target.style.display = 'none';
                const placeholder = e.target.closest('.product-image-wrapper')?.querySelector('.product-image-placeholder');
                if (placeholder) placeholder.style.display = 'flex';
              }}
            />
          ) : null}
          <div className="product-image-placeholder" style={{ display: hasImage ? 'none' : 'flex' }}>
            <div className="placeholder-icon">📦</div>
            <div className="placeholder-text">
              {product.name[currentLanguage]}
            </div>
          </div>
        </div>

        {/* Бейдж ексклюзивності */}
        {product.isExclusive && (
          <div className="product-exclusive-badge">
            {currentLanguage === 'ua' ? 'Ексклюзив' : 'Exclusive'}
          </div>
        )}
      </div>

      {/* Інформація про продукт */}
      <div className="product-info">
        {/* Назва продукту */}
        <h3 className="product-name">
          {product.name[currentLanguage]}
        </h3>

        {/* Текстура та обробка */}
        <div className="product-material-info">
          <button 
            className="texture-link"
            onClick={handleTextureClick}
            aria-label={`${currentLanguage === 'ua' ? 'Переглянути текстуру' : 'View texture'} ${texture?.name[currentLanguage]}`}
          >
            <span className="texture-name">
              {texture?.name[currentLanguage]}
            </span>
          </button>
          
          <div className="finish-info">
            <span className="finish-icon" title={getFinishDescription()} aria-hidden="true">
              {finishInfo?.icon}
            </span>
            <span className="finish-name">
              {getFinishDescription()}
            </span>
          </div>
        </div>

        {/* Розміри */}
        <div className="product-dimensions">
          <span className="dimensions-label">
            {currentLanguage === 'ua' ? 'Розміри:' : 'Dimensions:'}
          </span>
          <span className="dimensions-value">
            {formatDimensions(product.dimensions)}
          </span>
        </div>

        {/* Ціна */}
        <div className="product-pricing">
          <div className="price-main">
            {product.price[currentLanguage]}
          </div>
          {product.priceNote && (
            <div className="price-note">
              {product.priceNote[currentLanguage]}
            </div>
          )}
        </div>

        {/* Опис */}
        <p className="product-description">
          {product.description[currentLanguage]}
        </p>

        {/* Особливості */}
        {product.features && (
          <div className="product-features">
            <h4 className="features-title">
              {currentLanguage === 'ua' ? 'Особливості:' : 'Features:'}
            </h4>
            <ul className="features-list">
              {product.features[currentLanguage].map((feature, index) => (
                <li key={index} className="feature-item">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Час виготовлення для замовлень */}
        {!product.inStock && product.leadTime && (
          <div className="product-lead-time">
            <span className="lead-time-label">
              {currentLanguage === 'ua' ? 'Час виготовлення:' : 'Lead time:'}
            </span>
            <span className="lead-time-value">
              {product.leadTime[currentLanguage]}
            </span>
          </div>
        )}

        {/* Кнопки дій */}
        <div className="product-actions">
          <Button
            variant="primary"
            size="medium"
            onClick={handleOrderClick}
            className="order-button"
            ariaLabel={currentLanguage === 'ua' ? `Замовити ${product.name[currentLanguage]}` :
                       currentLanguage === 'en' ? `Order ${product.name[currentLanguage]} now` :
                       currentLanguage === 'de' ? `${product.name[currentLanguage]} bestellen` :
                       `Zamów ${product.name[currentLanguage]} teraz`}
          >
            {currentLanguage === 'ua' ? 'Замовити'
              : currentLanguage === 'en' ? 'Order Now'
              : currentLanguage === 'de' ? 'Bestellen'
              : 'Zamów teraz'}
          </Button>

          <Button
            variant="outline"
            size="medium"
            onClick={handleTextureClick}
            className="texture-button"
            ariaLabel={currentLanguage === 'ua' ? `Переглянути текстури для ${product.name[currentLanguage]}` :
                       currentLanguage === 'en' ? `View textures for ${product.name[currentLanguage]}` :
                       currentLanguage === 'de' ? `Texturen für ${product.name[currentLanguage]} ansehen` :
                       `Zobacz tekstury dla ${product.name[currentLanguage]}`}
          >
            {currentLanguage === 'ua' ? 'Текстури'
              : currentLanguage === 'en' ? 'View Textures'
              : currentLanguage === 'de' ? 'Texturen'
              : 'Tekstury'}
          </Button>
        </div>

        {/* Додаткова інформація про кастомізацію */}
        {product.customizable && (
          <div className="product-customization-note">
            <span className="customization-icon">⚙️</span>
            <span className="customization-text">
              {currentLanguage === 'ua'
                ? 'Можна виготовити з будь-якої текстури'
                : currentLanguage === 'en'
                ? 'Can be made from any texture'
                : currentLanguage === 'de'
                ? 'Kann aus jeder Textur hergestellt werden'
                : 'Można wykonać z dowolnej tekstury'
              }
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;