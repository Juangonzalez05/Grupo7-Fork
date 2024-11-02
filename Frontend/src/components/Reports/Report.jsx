import React from 'react';
import api from '../../api/api.js';  

const ReportButton = ({ courseId }) => {
    const handleGenerateReport = async () => {
        try {
            
            const pdfResponse = await api.get(`/grades/reporte-estudiantes/${courseId}/`, {
                responseType: 'blob'  // Esto asegura que obtienes un archivo binario (PDF)
            });

            const url = window.URL.createObjectURL(new Blob([pdfResponse.data], { type: 'application/pdf' }));
            window.open(url, '_blank');
        } catch (error) {
            console.error('Error al generar el reporte PDF:', error);
        }
    };

    return (
        <button onClick={handleGenerateReport}>
            Generar Reporte PDF
        </button>
    );
};

export default ReportButton;

