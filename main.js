const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/* <article class="modal-backdrop">
        <div class="modal-container">
            <button class="close-button">&times;</button>
        </div>
</article> */

function Modal(options = {}) {
    const { templateId, closeMethods = ['button', 'overlay', 'escape'] } = options;
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

    this.open = () => {
        const content = template.content.cloneNode(true);

        // Create elements
        const backdrop = document.createElement('article');
        backdrop.className = 'modal-backdrop';

        const container = document.createElement('div')
        container.className = 'modal-container';

        if (this._allowButtonClose) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-button';
            closeBtn.innerHTML = '&times;';

            container.append(closeBtn);
            closeBtn.onclick = () => this.closeModal(backdrop);
        }

        // Append Elements
        container.append(content);
        backdrop.append(container);
        document.body.append(backdrop);

        setTimeout(() => {
            backdrop.classList.add('show');
        }, 0);

        // Close Events

        if (this._allowBackdropClose) {
            backdrop.onclick = (e) => {
                if (e.target === backdrop) {
                    this.closeModal(backdrop);
                }
            }
        }
        
        if (this._allowEscapeClose) {
            document.addEventListener('keydown', (e)=> {
                if (e.key === 'Escape') {
                    this.closeModal(backdrop);
                }
            })
        }

        // Disable scrolling
        document.body.classList.add('no-scroll');
        document.body.style.paddingRight = getScrollbarWidth() + 'px';
    }

    this.closeModal = (modalElement) => {
        modalElement.classList.remove('show');
        modalElement.ontransitionend = () => {
            modalElement.remove();

            // Enable scrolling
            document.body.classList.remove('no-scroll');
            document.body.style.paddingRight = '';
        }
    }
}


const modal1 = new Modal({
        templateId: "#modal-1"
    });
$('#open-modal-1').onclick = () => {
    modal1.open()
}

const modal2 = new Modal({
        templateId: "#modal-2"
    });
$('#open-modal-2').onclick = () => {
    modal2.open()
}

const modal3 = new Modal({
        templateId: "#modal-3"
    });
$('#open-modal-3').onclick = () => {
    modal3.open()
}

const modal4 = new Modal({
        templateId: "#modal-4"
    });
$('#open-modal-4').onclick = () => {
    modal4.open()
}

const modal5 = new Modal({
        templateId: "#modal-5"
    });
$('#open-modal-5').onclick = () => {
    modal5.open()
}

const modal6 = new Modal({
        templateId: "#modal-6"
    });
$('#open-modal-6').onclick = () => {
    modal6.open()
}

const modal7 = new Modal({
        templateId: "#modal-7"
    });
$('#open-modal-7').onclick = () => {
    modal7.open()
}

const modal8 = new Modal({
        templateId: "#modal-8"
    });
$('#open-modal-8').onclick = () => {
    modal8.open()
}
