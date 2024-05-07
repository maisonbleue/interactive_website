export default () => {
    const interestButtonProject = document.querySelector('.point-1')
    const projectPage = document.querySelector('.project-page')
    const crossProjectPage = document.querySelector('.cross-project-page')
    const videos = document.getElementsByClassName('.project-video')
    const html = document.querySelector('html')
    const pageBackground = document.querySelector('.page-bg')

    interestButtonProject.addEventListener('click', () => {
        openProjectPage()
    })


    crossProjectPage.addEventListener('click', () => {
        closeProjectPage()
    })

    document.playVideo = function(video) {
        video.play()
    }

    document.stopVideo = function(video) {
        
        video.pause()
        video.currentTime = 0
    }

    pageBackground.addEventListener('click', () => {
        closeProjectPage()
    })

    function openProjectPage() {
        projectPage.style.display = 'block'
        pageBackground.style.display = 'block'

        html.style.overflowY = 'hidden'
    }

    function closeProjectPage() {
        projectPage.style.display = 'none'
        pageBackground.style.display = 'none'
        html.style.overflowY = 'unset'
    }

}
