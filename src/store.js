import { create } from "zustand";

// Middleware برای ذخیره اطلاعات در LocalStorage
const persistMiddleware = (config) => (set, get, api) => config(
    (args) => {
        set(args);
        localStorage.setItem("authState", JSON.stringify(get()));
    },
    get,
    api
);


export const useAuthStore = create(persistMiddleware((set)=>({
    user : JSON.parse(localStorage.getItem('authState'))?.user || null,
    login : (userData)=>set({user: userData}),
    logout : ()=>set({user:null})
})));



export const useFileStore = create((set)=>({
    uploadedFile : null,
    setUploadedFile : (file)=>set({uploadedFile: file})
}));



export const useThemeStore = create((set) => ({
    theme: localStorage.getItem('theme') || 'light',
    toggleTheme: () => set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return { theme: newTheme };
    })
}));