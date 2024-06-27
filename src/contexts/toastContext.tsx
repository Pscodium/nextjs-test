import { IToastMessage } from "@/types/toast-message";
import React, { createContext, useContext, useEffect, useState } from "react";

type ToastContextProps = {
    toasts: IToastMessage[] | undefined;
    closeToast: (id: number | undefined) => void;
    sendToast: (props: IToastMessage) => void;
}


const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<IToastMessage[]>([])

    useEffect(() => {
        const removeToastAfterDuration = (id: number | undefined, duration: number) => {
            setTimeout(() => {
                closeToast(id);
            }, duration);
        };

        toasts.forEach(toast => {
            if (toast.duration) {
                removeToastAfterDuration(toast.id, toast.duration);
            }
        });

        return () => {
            toasts.forEach(toast => {
                if (toast.duration) {
                    clearTimeout(toast.id);
                }
            });
        };
    }, [toasts, closeToast]);

    function closeToast(id: number | undefined) {
        const index = toasts?.findIndex(item => item.id === id);
        if (index !== -1) {
            const updatedToastsList = toasts?.filter(item => item.id != id);
            setToasts(updatedToastsList);
        }
    }

    function sendToast(props: IToastMessage) {
        const newToast = {
            ...props,
            id: toasts?.length? toasts.length + 1 : 1
        };
        setToasts([...toasts, newToast]);
    }


    return (
        <ToastContext.Provider
            value={{
                toasts,
                closeToast,
                sendToast
            }}
        >
            <>{children}</>
        </ToastContext.Provider>
    );
}

const useToast = () => {
    const context = useContext(ToastContext);
    return context;
};

export { ToastProvider, useToast, ToastContext };