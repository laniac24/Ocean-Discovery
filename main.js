const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/* <article class="modal-backdrop">
        <div class="modal-container">
            <button class="close-button">&times;</button>
        </div>
</article> */

function Modal(options = {}) {
    const { templateId,
            closeMethods = ['button', 'overlay', 'escape'],
            destroyOnClose = true,
            cssClass = [],
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
        this._backdrop.append(container);
        document.body.append(this._backdrop);
    }

    this.open = () => {
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
            document.addEventListener('keydown', (e)=> {
                if (e.key === 'Escape') {
                    this.close();
                }
            })
        }

        this._onTransitionEnd(() => {
            if (typeof onOpen === 'function') onOpen();
        })
    
        // Disable scrolling
        document.body.classList.add('no-scroll');
        document.body.style.paddingRight = getScrollbarWidth() + 'px';
    }

    this._onTransitionEnd = (callback) => {
        this._backdrop.ontransitionend = (e) => {
            if (e.propertyName !== 'transform') return;
            if (typeof callback === 'function') callback();
        }
    }

    this.close = (destroy = destroyOnClose) => {
        this._backdrop.classList.remove('show');
        
        this._onTransitionEnd(() => {
            if (typeof onClose === 'function') onClose();
            if (destroy && this._backdrop) {
                this._backdrop.remove();
                this._backdrop = null;
            }
    
            // Enable scrolling
            document.body.classList.remove('no-scroll');
            document.body.style.paddingRight = '';
        });
    }
}


const modal1 = new Modal({
        templateId: "#modal-1",
        destroyOnClose: false,
    });
$('#open-modal-1').onclick = () => {
    modal1.open()
}

const modal2 = new Modal({
        templateId: "#modal-2",
        destroyOnClose: false,
        cssClass: ['class1', 'class2', 'classN'],
        onOpen: () => {
            console.log('Modal opened');
        },
        onClose: () => {
            console.log('Modal closed');
        }
    });
$('#open-modal-2').onclick = () => {
    modal2.open()
}

const modal3 = new Modal({
        templateId: "#modal-3",
        destroyOnClose: false,
    });
$('#open-modal-3').onclick = () => {
    modal3.open()
}

const modal4 = new Modal({
        templateId: "#modal-4",
        destroyOnClose: false,
    });
$('#open-modal-4').onclick = () => {
    modal4.open()
}

const modal5 = new Modal({
        templateId: "#modal-5",
        destroyOnClose: false,
    });
$('#open-modal-5').onclick = () => {
    modal5.open()
}

const modal6 = new Modal({
        templateId: "#modal-6",
        destroyOnClose: false,
    });
$('#open-modal-6').onclick = () => {
    modal6.open()
}

const modal7 = new Modal({
        templateId: "#modal-7",
        destroyOnClose: false,
    });
$('#open-modal-7').onclick = () => {
    modal7.open()
}

const modal8 = new Modal({
        templateId: "#modal-8",
        destroyOnClose: false,
    });
$('#open-modal-8').onclick = () => {
    modal8.open()
}
