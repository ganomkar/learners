document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('pre code').forEach((codeBlock) => {
        const button = document.createElement('button');
        button.innerText = 'Copy';
        button.className = 'copy-button';

        button.addEventListener('click', () => {
            navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                button.innerText = 'Copied!';
                setTimeout(() => {
                    button.innerText = 'Copy';
                }, 2000);
            });
        });

        const pre = codeBlock.parentNode;
        pre.parentNode.insertBefore(button, pre);
    });
});
