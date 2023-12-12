document.addEventListener('DOMContentLoaded', function () {
  const convertButton = document.getElementById('convertButton');
  const tempInput = document.getElementById('tempInput');
  const conversionType = document.getElementById('conversionType');
  const result = document.getElementById('result');

  convertButton.addEventListener('click', function () {
      const temperature = parseFloat(tempInput.value);
      const type = conversionType.value;
      let convertedTemperature;

      if (type === 'celsiusToFahrenheit') {
          convertedTemperature = (temperature * 9/5) + 32;
          result.textContent = `${temperature} grados Celsius son equivalentes a ${convertedTemperature.toFixed(2)} grados Fahrenheit.`;
      } else if (type === 'fahrenheitToCelsius') {
          convertedTemperature = (temperature - 32) * 5/9;
          result.textContent = `${temperature} grados Fahrenheit son equivalentes a ${convertedTemperature.toFixed(2)} grados Celsius.`;
      } else {
          result.textContent = 'Seleccione un tipo de conversión válido.';
      }
  });
});