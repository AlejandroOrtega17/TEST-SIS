import { createMemoryHistory, createRouter } from "vue-router";

import Dashboard from "./components/layouts/dashboard/Dashboard.vue";
import MasInformacion from "./components/layouts/chartDetails/MasInformacion.vue";
import GraficoDetallado from "./components/layouts/chartDetails/GraficoDetallado.vue";
import Tabla from "./components/charts/Tabla.vue";

const routes = [
    {
        path: "/",
        name: "dashboard",
        component: Dashboard
    },
    {
        path: "/informacion/:dispositivoId",
        name: "mas-informacion",
        component: MasInformacion,
        children: [
            {
                path: "grafico",
                name: "grafico-detallado",
                component: GraficoDetallado
            },
            {
                path: "tabla",
                name: "tabla-historial",
                component: Tabla
            }
        ]
    }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
});

export default router;