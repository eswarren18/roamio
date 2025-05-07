import ReactDom from 'react-dom';

function Modal({ open, onClose, children }) {
    if (!open) return null;

    return ReactDom.createPortal(
        // Overlay
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-20"
            onClick={onClose}
        >
            {/* Modal */}
            <div
                className="flex flex-col bg-white rounded-lg shadow-lg w-96 p-4 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 p-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.7}
                        stroke="currentColor"
                        className="size-6 text-gray-400"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                {children}
            </div>
        </div>,
        document.getElementById('portal')
    );
}

export default Modal;
