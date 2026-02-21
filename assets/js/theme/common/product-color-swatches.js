export default function initColorSwatches() {
    const colorSwatchContainers = document.querySelectorAll('[data-product-id]');
    
    if (colorSwatchContainers.length === 0) {
        return;
    }
    
    colorSwatchContainers.forEach((container) => {
        const productId = container.getAttribute('data-product-id');
        const rawOptions = container.getAttribute('data-color-options');
        const swatchesContainer = container.querySelector('.swatches-container');
        
        if (rawOptions && swatchesContainer && swatchesContainer.children.length === 0) {
            let colors = [];
            try {
                const parsed = JSON.parse(rawOptions);
                if (Array.isArray(parsed)) {
                    colors = parsed.map(c => typeof c === 'string' ? {name: c, hex: c} : {name: c.name || c.hex, hex: c.hex || c.color});
                }
            } catch (e) {
                colors = rawOptions.split(',').map(s => {
                    const parts = s.split(':').map(p => p.trim());
                    return parts.length === 2 ? { name: parts[0], hex: parts[1] } : { name: parts[0], hex: parts[0] };
                }).filter(c => c.name);
            }

            colors.forEach(colorObj => {
                const button = document.createElement('button');
                button.className = 'color-swatch';
                button.setAttribute('data-color-name', colorObj.name);
                button.setAttribute('data-color-value', colorObj.hex);
                button.setAttribute('aria-label', `Color: ${colorObj.name}`);
                button.type = 'button';
                swatchesContainer.appendChild(button);
            });
        }
        
        const swatchButtons = container.querySelectorAll('.color-swatch');
        
        swatchButtons.forEach((button) => {
            const hexValue = button.getAttribute('data-color-value');
            const colorName = button.getAttribute('data-color-name');
            button.style.setProperty('--color-value', `#${hexValue.replace('#', '')}`);
            button.style.backgroundColor = `#${hexValue.replace('#', '')}`;
            
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
                                (optVal) => optVal.label && optVal.label.toLowerCase() === colorName.toLowerCase()
                            );
                        });
                        if (matchingVariants.length > 0) {
                            const firstVariant = matchingVariants[0];
                            updateProductInfo(container, firstVariant, colorName);
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
