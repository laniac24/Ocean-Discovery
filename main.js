const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/* <article class="modal-backdrop">
        <div class="modal-container">
            <button class="close-button">&times;</button>
        </div>
</article> */

Modal.elements = [];

function Modal(options = {}) {
    const { templateId,
            closeMethods = ['button', 'overlay', 'escape'],
            destroyOnClose = true,
            cssClass = [],
            footer = false,
            onOpen,
            onClose
    } = options;
    const template = $(`${templateId}`);

    if (!template) return console.error(`${templateId} does not exist!`);

    this._allowButtonClose = closeMethods.includes('button');
    this._allowBackdropClose = closeMethods.includes('overlay');
    this._allowEscapeClose = closeMethods.includes('escape');

    function getScrollbarWidth() {
        if (getScrollbarWidth.value) {
            return getScrollbarWidth.value;
        }
        const div = document.createElement('div');
        Object.assign(div.style, {
            overflow: 'scroll',
            position: 'absolute',
            top: '-9999px'
        });

        document.body.appendChild(div)
        const scrollbarWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);

        getScrollbarWidth.value = scrollbarWidth;
        return scrollbarWidth;
    }

    this._build = () => {
        const content = template.content.cloneNode(true);

        // Create elements
        this._backdrop = document.createElement('article');
        this._backdrop.className = 'modal-backdrop';

        const container = document.createElement('div')
        container.className = 'modal-container';

        cssClass.forEach(className => {
            if (typeof className === 'string') {
                container.classList.add(`${className}`);
            }
        })

        if (this._allowButtonClose) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-button';
            closeBtn.innerHTML = '&times;';

            container.append(closeBtn);
            closeBtn.onclick = () => this.close();
        }

        // Append Elements
        container.append(content);

        if (footer) {
            this._modalFooter = document.createElement('div');
            this._modalFooter.className = 'modal-footer';
            if (this._footerContent) {
                this._modalFooter.innerHTML = this._footerContent;
            }

            this._footerButtons.forEach(button => {
                if (button) {
                    this._modalFooter.append(button);
                }
            })

            container.append(this._modalFooter);
        }

        this._backdrop.append(container);
        document.body.append(this._backdrop);
    }

    this.setFooterContent = html => {
        this._footerContent = html;
        if (this._modalFooter) {
            this._modalFooter.innerHTML = html;
        }
    }

    this._footerButtons = [];

    this.addFooterButton = (title, cssClass, callback) => {
        const button = document.createElement('button');
        button.className = cssClass;
        button.innerHTML = title;
        button.onclick = callback;

        this._footerButtons.push(button);
    }

    this.open = () => {
        Modal.elements.push(this);

        if (!this._backdrop) {
            this._build();
        }

        setTimeout(() => {
            this._backdrop.classList.add('show');
        }, 0);

        // Close Events

        if (this._allowBackdropClose) {
            this._backdrop.onclick = (e) => {
                if (e.target === this._backdrop) {
                    this.close();
                }
            }
        }
        
        if (this._allowEscapeClose) {
            document.addEventListener('keydown', this._handleEscapeKey);
        }

        this._onTransitionEnd(() => {
            if (typeof onOpen === 'function') onOpen();
        })
    
        // Disable scrolling
        document.body.classList.add('no-scroll');
        document.body.style.paddingRight = getScrollbarWidth() + 'px';
    }

    this._handleEscapeKey = (e)=> {
        if (e.key === 'Escape' && this === Modal.elements[Modal.elements.length - 1]) {
            this.close();
        }
    }

    this._onTransitionEnd = (callback) => {
        this._backdrop.ontransitionend = (e) => {
            if (e.propertyName !== 'transform') return;
            if (typeof callback === 'function') callback();
        }
    }

    this.close = (destroy = destroyOnClose) => {
        Modal.elements.pop();
        this._backdrop.classList.remove('show');

        if (this._allowEscapeClose) {
            document.removeEventListener('keydown', this._handleEscapeKey);
        }
        
        this._onTransitionEnd(() => {
            if (typeof onClose === 'function') onClose();
            if (destroy && this._backdrop) {
                this._backdrop.remove();
                this._backdrop = null;
                this._modalFooter = null;
            }
    
            // Enable scrolling
            if (!Modal.elements.length) {
                document.body.classList.remove('no-scroll');
                document.body.style.paddingRight = '';
            }
        });
    }
}


const modal1 = new Modal({
        templateId: "#modal-1",
        footer: true,
    });

modal1.setFooterContent('<h3>Related Content:</h3>');
modal1.addFooterButton('Coral Reef', 'modal-btn reef-btn',(e) => {
    modal2.open();
})
modal1.addFooterButton('Kelp Forest', 'modal-btn kelp-btn',(e) => {
    modal3.open();
})

$('#open-modal-1').onclick = () => {
    modal1.open()
}

const modal2 = new Modal({
        templateId: "#modal-2",
        cssClass: ['class1', 'class2', 'classN'],
        footer: true,
        onOpen: () => {
            console.log('Modal opened');
        },
        onClose: () => {
            console.log('Modal closed');
        }
    });
modal2.setFooterContent('<h3>Related Content:</h3>');
modal2.addFooterButton('Sandy Beach', 'modal-btn beach-btn',(e) => {
    modal1.open();
});
modal2.addFooterButton('Kelp Forest', 'modal-btn kelp-btn',(e) => {
    modal3.open();
});
$('#open-modal-2').onclick = () => {
    modal2.open()
}

const modal3 = new Modal({
        templateId: "#modal-3",
        footer: true,
    });
modal3.setFooterContent('<h3>Related Content:</h3>');
modal3.addFooterButton('Coral Reef', 'modal-btn reef-btn',(e) => {
    modal2.open();
});
modal3.addFooterButton('Seagrass Meadow', 'modal-btn seagrass-btn',(e) => {
    modal4.open();
});
$('#open-modal-3').onclick = () => {
    modal3.open()
}

const modal4 = new Modal({
        templateId: "#modal-4",
        footer: true,
    });
modal4.setFooterContent('<h3>Related Content:</h3>');
modal4.addFooterButton('Kelp Forest', 'modal-btn kelp-btn',(e) => {
    modal3.open();
});
modal4.addFooterButton('Epipelagic', 'modal-btn epi-btn',(e) => {
    modal5.open();
});
$('#open-modal-4').onclick = () => {
    modal4.open()
}

const modal5 = new Modal({
        templateId: "#modal-5",
        footer: true,
    });
modal5.setFooterContent('<h3>Related Content:</h3>');
modal5.addFooterButton('Seagrass Meadow', 'modal-btn seagrass-btn',(e) => {
    modal4.open();
});
modal5.addFooterButton('Mesopelagic', 'modal-btn meso-btn',(e) => {
    modal6.open();
});
$('#open-modal-5').onclick = () => {
    modal5.open()
}

const modal6 = new Modal({
        templateId: "#modal-6",
        footer: true,
    });
modal6.setFooterContent('<h3>Related Content:</h3>');
modal6.addFooterButton('Epipelagic', 'modal-btn epi-btn',(e) => {
    modal5.open();
});
modal6.addFooterButton('Bathypelagic', 'modal-btn bathy-btn',(e) => {
    modal7.open();
});
$('#open-modal-6').onclick = () => {
    modal6.open()
}

const modal7 = new Modal({
        templateId: "#modal-7",
        footer: true,
    });
modal7.setFooterContent('<h3>Related Content:</h3>');
modal7.addFooterButton('Mesopelagic', 'modal-btn meso-btn',(e) => {
    modal6.open();
});
modal7.addFooterButton('Abyssopelagic', 'modal-btn abysso-btn',(e) => {
    modal8.open();
});
$('#open-modal-7').onclick = () => {
    modal7.open()
}

const modal8 = new Modal({
        templateId: "#modal-8",
        footer: true,
    });

modal8.setFooterContent('<h3>Related Content:</h3>');
modal8.addFooterButton('Mesopelagic', 'modal-btn meso-btn',(e) => {
    modal6.open();
});
modal8.addFooterButton('Bathypelagic', 'modal-btn bathy-btn',(e) => {
    modal7.open();
});

$('#open-modal-8').onclick = () => {
    modal8.open()
}
