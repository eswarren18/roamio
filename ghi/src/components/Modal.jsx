import ReactDom from 'react-dom'

function Modal({ open, onClose, children }) {
    if (!open) return null

    return ReactDom.createPortal(
        // Overlay
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-20"
            onClick={onClose}
        >
            {/* Modal */}
            <div
                className="flex flex-col bg-white rounded-lg shadow-lg w-96 p-6"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.getElementById('portal')
    )
}

export default Modal
