const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/* <article class="modal-backdrop">
        <div class="modal-container">
            <button class="close-button">&times;</button>
        </div>
</article> */

function Modal() {
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

    this.openModal = (options = {}) => {
        const { templateId, allowModalClose = true } = options;
        const template = $(`${templateId}`);

        if (!template) return console.error(`${templateId} does not exist!`);
        
        const content = template.content.cloneNode(true);

        // Create elements
        const backdrop = document.createElement('article');
        backdrop.className = 'modal-backdrop';

        const container = document.createElement('div')
        container.className = 'modal-container';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-button';
        closeBtn.innerHTML = '&times;';

        // Append Elements
        container.append(closeBtn, content);
        backdrop.append(container);
        document.body.append(backdrop);

        setTimeout(() => {
            backdrop.classList.add('show');
        }, 0);

        // Close Events
        closeBtn.onclick = () => this.closeModal(backdrop);

        if (allowModalClose) {
            backdrop.onclick = (e) => {
                if (e.target === backdrop) {
                    this.closeModal(backdrop);
                }
            }
        }
        
        document.addEventListener('keydown', (e)=> {
            if (e.key === 'Escape') {
                this.closeModal(backdrop);
            }
        })

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


const modal = new Modal();

$('#open-modal-1').onclick = () => {
    modal.openModal({
        templateId: "#modal-1",
        allowModalClose: true
    })
}

$('#open-modal-2').onclick = () => {
    modal.openModal({
        templateId: "#modal-2",
        allowModalClose: true
    })
}

$('#open-modal-3').onclick = () => {
    modal.openModal({
        templateId: "#modal-3",
        allowModalClose: true
    })
}

$('#open-modal-4').onclick = () => {
    modal.openModal({
        templateId: "#modal-4",
        allowModalClose: true
    })
}

$('#open-modal-5').onclick = () => {
    modal.openModal({
        templateId: "#modal-5",
        allowModalClose: true
    })
}

$('#open-modal-6').onclick = () => {
    modal.openModal({
        templateId: "#modal-6",
        allowModalClose: true
    })
}

$('#open-modal-7').onclick = () => {
    modal.openModal({
        templateId: "#modal-7",
        allowModalClose: true
    })
}

$('#open-modal-8').onclick = () => {
    modal.openModal({
        templateId: "#modal-8",
        allowModalClose: true
    })
}