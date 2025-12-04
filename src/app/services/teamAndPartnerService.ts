import apiClient from "../helpers/apiClient";

export async function getCategories() {
    const response = await apiClient.get(`/experiences/categories/`,{});
    return response.data;
}



/* 

Listar (Cualquiera): GET /api/v1/experiences/categories/
Crear (Solo Admin): POST /api/v1/experiences/categories/
    JSON: {"name": "Aventura"}
Editar (Solo Admin): PUT /api/v1/experiences/categories/1/
Borrar (Solo Admin): DELETE /api/v1/experiences/categories/1/





*/