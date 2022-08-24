import {  useEffect, useRef  } from 'react'

const MainModal = ({size = 'md', children, isShowModal, cancelHandler, backdrop = false, keyboard = false}) => {

    const modalRef = useRef(null)

    const sizes  = {
        sm: 'sm:max-w-2xl',
        md: 'sm:max-w-4xl',
        lg: 'sm:max-w-5xl',
    }

    useEffect(() => {
        if (isShowModal) {
            modalRef.current.scrollTo({top: 0})
            document.querySelector('body').classList.add('overflow-hidden')
        }

        return () => {
            document.querySelector('body').classList.remove('overflow-hidden')
        }
    }, [isShowModal])

    useEffect(() => {
        if (keyboard) {
            window.addEventListener('keydown', closeModalFormWithESC)
            return () => window.removeEventListener('keydown', closeModalFormWithESC)
        }
    })

    const closeModalFormWithESC = e => e.keyCode === 27 && cancelHandler()

    const backdropHandler = ({target: {id}}) => backdrop && (id === 'modalId' || id === 'contentId') && cancelHandler()

    return (
        <div id="modalId" onClick={backdropHandler} ref={modalRef} className={`${isShowModal ? 'block' : 'hidden'} fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-[999] bg-gray-500/75`}>
            <div id="contentId" className="flex justify-center pt-4 px-4 pb-20 text-center sm:block">
                <div className={`${sizes[size]} relative inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg text-right overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full px-4 py-6 animate-modal`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default MainModal