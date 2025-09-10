import React from 'react';
import useLanguageStore from '../../../stores/languageStore';
import useModalStore from '../../../stores/modalStore';
import useGraniteSystemStore from '../../../stores/graniteSystemStore';
import { graniteTypes } from '../../../constants/graniteData';
import { surfaceFinishTypes, combinedFinishTypes } from '../../../constants/productsData';
import Button from '../../atoms/Button/Button';

const ProductCard = ({ product }) => {
  const { currentLanguage } = useLanguageStore();
  const { openModal } = useModalStore();
  const { openGallery } = useGraniteSystemStore();

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

  // Форматування розмірів
  const formatDimensions = (dimensions) => {
    if (dimensions.length === 'custom') {
      return currentLanguage === 'ua' ? 'Під замовлення' : 'Custom size';
    }
    return `${dimensions.length}×${dimensions.width}×${dimensions.height} ${dimensions.unit}`;
  };

  // Обробка кліку на текстуру
  const handleTextureClick = () => {
    if (textureData) {
      openGallery(textureData.type);
    }
  };

  // Обробка кліку на замовлення
  const handleOrderClick = () => {
    // Тут буде відкриття форми замовлення або переходу на contact
    console.log('Order product:', product.id);
  };

  return (
    <div className="product-card">
      {/* Зображення продукту */}
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name[currentLanguage]}
          className="product-image"
          onError={(e) => {
            e.target.src = '/images/textures/placeholder-product.jpg';
          }}
        />
        
        {/* Бейдж наявності */}
        <div className={`product-availability-badge ${product.inStock ? 'in-stock' : 'custom-order'}`}>
          {product.inStock 
            ? (currentLanguage === 'ua' ? 'В наявності' : 'In Stock')
            : (currentLanguage === 'ua' ? 'Під замовлення' : 'Custom Order')
          }
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
            <span className="finish-icon" role="img" aria-label={finishInfo?.name[currentLanguage]}>
              {finishInfo?.icon}
            </span>
            <span className="finish-name">
              {finishInfo?.name[currentLanguage]}
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
          >
            {currentLanguage === 'ua' ? 'Замовити' : 'Order Now'}
          </Button>
          
          <Button
            variant="outline"
            size="medium"
            onClick={handleTextureClick}
            className="texture-button"
          >
            {currentLanguage === 'ua' ? 'Переглянути текстуру' : 'View Texture'}
          </Button>
        </div>

        {/* Додаткова інформація про кастомізацію */}
        {product.customizable && (
          <div className="product-customization-note">
            <span className="customization-icon">⚙️</span>
            <span className="customization-text">
              {currentLanguage === 'ua' 
                ? 'Можна виготовити з будь-якої текстури' 
                : 'Can be made from any texture'
              }
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;