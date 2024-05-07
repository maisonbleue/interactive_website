export default () =>
{
    // const button1 = document.querySelector('#button-1')
    const button2 = document.querySelector('#button-2')
    const projectButton = document.querySelector('.project-button')
    const contactButton = document.querySelector('.contact-button')
    const enterButton = document.querySelector('.enter-button')
    var direction = -1
    
    // button1.addEventListener('mouseover', () => {
    //     direction = direction === 1 ? -1 : 1;
    //     button1.pause()
    //     button1.setDirection(direction)
    //     button1.play()
    // })
    
    // button1.addEventListener('mouseout', () => {
    //     direction = direction === 1 ? -1 : 1;
    //     button1.pause()
    //     button1.setDirection(direction)
    //     button1.play()
    // })

    enterButton.addEventListener('mouseover', () => {
        direction = direction === 1 ? -1 : 1;
        enterButton.pause()
        enterButton.setDirection(direction)
        enterButton.play()
    })
    
    enterButton.addEventListener('mouseout', () => {
        direction = direction === 1 ? -1 : 1;
        enterButton.pause()
        enterButton.setDirection(direction)
        enterButton.play()
    })

    projectButton.addEventListener('mouseover', () => {
        direction = direction === 1 ? -1 : 1;
        projectButton.pause()
        projectButton.setDirection(direction)
        projectButton.play()
    })
    
    projectButton.addEventListener('mouseout', () => {
        direction = direction === 1 ? -1 : 1;
        projectButton.pause()
        projectButton.setDirection(direction)
        projectButton.play()
    })

    contactButton.addEventListener('mouseover', () => {
        direction = direction === 1 ? -1 : 1;
        contactButton.pause()
        contactButton.setDirection(direction)
        contactButton.play()
    })
    
    contactButton.addEventListener('mouseout', () => {
        direction = direction === 1 ? -1 : 1;
        contactButton.pause()
        contactButton.setDirection(direction)
        contactButton.play()
    })

    button2.addEventListener('mouseover', () => {
        direction = direction === 1 ? -1 : 1;
        button2.pause()
        button2.setDirection(direction)
        button2.play()
    })
    
    button2.addEventListener('mouseout', () => {
        direction = direction === 1 ? -1 : 1;
        button2.pause()
        button2.setDirection(direction)
        button2.play()
    })
}