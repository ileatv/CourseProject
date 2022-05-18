//Удаление папки с результатом
import del from "del"; 
export const reset = () => {
    return del(app.path.clean);
}