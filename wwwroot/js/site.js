console.log("Script works")
document.querySelectorAll('li').forEach(li => {
            if (li.querySelector('ul')) {
                li.classList.add('has-children')
                li.addEventListener('click', e => {
                    if (e.target === li)
                        li.classList.toggle('open')
                })
            }
        })