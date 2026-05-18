/* eslint-disable */
/**
 * Google Apps Script - Telemetría Anónima
 * 
 * Instrucciones:
 * 1. Crea una hoja de cálculo nueva en Google Drive.
 * 2. Ve a Extensiones > Apps Script.
 * 3. Reemplaza el código existente por este contenido.
 * 4. Haz clic en "Implementar" > "Nueva implementación".
 * 5. Selecciona el engranaje > "Aplicación Web".
 * 6. Configura:
 *    - Ejecutar como: "Yo" (Tu cuenta de Google)
 *    - Quién tiene acceso: "Cualquiera"
 * 7. Haz clic en "Implementar", autoriza los permisos y copia la URL de la aplicación web generada (termina en /exec).
 * 8. Configura esa URL en tu variable de entorno de Vercel/Netlify: VITE_ANALYTICS_API_URL
 */

function doGet(e) {
  var action = e.parameter.action;
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // Asegurar que existan las hojas necesarias
  var pageViewsSheet = sheet.getSheetByName("PageViews") || sheet.insertSheet("PageViews");
  var exSheet = sheet.getSheetByName("ExerciseStats") || sheet.insertSheet("ExerciseStats");
  
  if (action === 'trackPageView') {
    var pageName = e.parameter.pageName;
    if (pageName) {
      incrementCounter(pageViewsSheet, pageName, 1);
    }
    return createJsonResponse({ success: true });
  }
  
  if (action === 'trackExerciseResult') {
    var exerciseNumber = e.parameter.exerciseNumber;
    var result = e.parameter.result;
    if (exerciseNumber && result) {
      var isSuccess = result === 'APROBADO';
      incrementExercise(exSheet, exerciseNumber, isSuccess);
    }
    return createJsonResponse({ success: true });
  }
  
  // Acción por defecto: Obtener estadísticas globales y agregadas
  var pageViews = {};
  var pageData = pageViewsSheet.getDataRange().getValues();
  for (var i = 0; i < pageData.length; i++) {
    if (pageData[i][0]) {
      pageViews[pageData[i][0]] = Number(pageData[i][1]) || 0;
    }
  }
  
  var exercises = {};
  var exData = exSheet.getDataRange().getValues();
  for (var j = 0; j < exData.length; j++) {
    if (exData[j][0]) {
      exercises[exData[j][0]] = {
        successCount: Number(exData[j][1]) || 0,
        failCount: Number(exData[j][2]) || 0
      };
    }
  }
  
  return createJsonResponse({ pageViews: pageViews, exercises: exercises });
}

function incrementCounter(sheet, key, amount) {
  var data = sheet.getDataRange().getValues();
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] == key) {
      sheet.getRange(i + 1, 2).setValue((Number(data[i][1]) || 0) + amount);
      return;
    }
  }
  sheet.appendRow([key, amount]);
}

function incrementExercise(sheet, exerciseNumber, isSuccess) {
  var data = sheet.getDataRange().getValues();
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] == exerciseNumber) {
      var col = isSuccess ? 2 : 3;
      var currentVal = Number(data[i][col - 1]) || 0;
      sheet.getRange(i + 1, col).setValue(currentVal + 1);
      return;
    }
  }
  if (isSuccess) {
    sheet.appendRow([exerciseNumber, 1, 0]);
  } else {
    sheet.appendRow([exerciseNumber, 0, 1]);
  }
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
