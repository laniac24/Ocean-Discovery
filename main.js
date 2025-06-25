const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/* <article class="modal-backdrop">
        <div class="modal-container">
            <button class="close-button">&times;</button>
        </div>
</article> */

function Modal() {
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
    }

    this.closeModal = (modalElement) => {
        modalElement.classList.remove('show');
        modalElement.ontransitionend = () => {
            modalElement.remove();

            // Enable scrolling
            document.body.classList.remove('no-scroll');
        }
    }
}


const modal = new Modal();

$('#open-modal-1').onclick = () => {
    modal.openModal({
        templateId: "#modal-1",
        allowModalClose: true
    })
    console.log("Hello");
    
}

$('#open-modal-2').onclick = () => {
    modal.openModal({
        templateId: "#modal-2",
        allowModalClose: true
    })
    console.log("Hello");
    
}

$('#open-modal-3').onclick = () => {
    modal.openModal({
        templateId: "#modal-3",
        allowModalClose: true
    })
    console.log("Hello");
    
}