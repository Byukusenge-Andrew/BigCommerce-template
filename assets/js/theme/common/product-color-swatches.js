export default function initColorSwatches() {
    const colorSwatchContainers = document.querySelectorAll('[data-product-id]');
    
    if (colorSwatchContainers.length === 0) {
        return;
    }
    
    colorSwatchContainers.forEach((container) => {
        const productId = container.getAttribute('data-product-id');
        const swatchButtons = container.querySelectorAll('.color-swatch');
        
        swatchButtons.forEach((button) => {
            const colorValue = button.getAttribute('data-color-value');
            button.style.setProperty('--color-value', `#${colorValue}`);
            button.style.backgroundColor = `#${colorValue}`;
            
            button.addEventListener('click', (e) => {
                e.preventDefault();
                swatchButtons.forEach((btn) => btn.classList.remove('active'));
                button.classList.add('active');
                if (window.stencilUtils && window.stencilUtils.api) {
                    const api = window.stencilUtils.api;
                    api.getPage(`/api/v3/catalog/products/${productId}?include=options,variants`, {
                        config: {
                            category: {
                                products: {
                                    limit: 1,
                                },
                            },
                        },
                    }, (err, response) => {
                        if (err) {
                            console.error('Error fetching product details:', err);
                            return;
                        }
                        const variants = response.data.variants || [];
                        const matchingVariants = variants.filter((variant) => {
                            return variant.option_values && variant.option_values.some(
                                (optVal) => optVal.label && optVal.label.toLowerCase() === colorValue.toLowerCase()
                            );
                        });
                        if (matchingVariants.length > 0) {
                            const firstVariant = matchingVariants[0];
                            updateProductInfo(container, firstVariant, colorValue);
                        }
                    });
                }
            });
        });
    });
}

function updateProductInfo(container, variant, colorValue) {
    const productCard = container.closest('.card');
    
    if (productCard) {
        const swatchContainer = productCard.querySelector('.product-color-swatches');
        if (swatchContainer) {
            swatchContainer.setAttribute('data-selected-color', colorValue);
        }
        
    }
}
