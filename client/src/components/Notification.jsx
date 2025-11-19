import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

function Notification({ message, type = 'info', onClose, duration = 4000 }) {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-6 h-6" />,
    error: <XCircle className="w-6 h-6" />,
    warning: <AlertCircle className="w-6 h-6" />,
    info: <Info className="w-6 h-6" />,
  };

  const styles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  return (
    <div className={`fixed top-4 right-4 z-50 ${styles[type]} px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 animate-slide-up max-w-md`}>
      {icons[type]}
      <p className="font-semibold flex-1">{message}</p>
      {onClose && (
        <button onClick={onClose} className="hover:opacity-70 transition-opacity">
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

export default Notification;
