import { memo } from 'react'
import ButtonElement from "../elements/button"

function Button ({children, onClick = null, type = 'button', size = 'lg', variant = 'primary', outline = false , widthFull = false, isSubmit = null, isSubmitEffect = false, className: classes = ''}) {
    return (
        <ButtonElement
            disabled={(isSubmit.length || isSubmit) && 'disabled'}
            onClick={onClick}
            type={type}
            size={size}
            variant={variant}
            outline={outline}
            widthFull={widthFull}
            className={classes}
        >
            <div className="relative">
                {
                    (isSubmit.length || isSubmit) && isSubmitEffect
                        ?
                            <span className="absolute left-[calc(50%-16px)] top-[calc(50%-8px)] flex ml-2 w-4 h-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white"></span>
                                <span className={`relative inline-flex rounded-full bg-white w-4 h-4`}></span>
                            </span>
                        :   null
                }
                <span className={`${(isSubmit.length || isSubmit) && 'opacity-60' }`}>{children}</span>
            </div>
        </ButtonElement>
    )
}

export default memo(Button)