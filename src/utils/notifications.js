import { toast } from "react-toastify"

const config = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

export const successNotification = (message) =>
toast.success(message, config);

export const failedNotification = (message) =>
toast.error(message, config);

export const errorNotification = (message) =>
toast.warning(message, config);