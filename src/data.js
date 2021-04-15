async function getData(url) {
    const dataResponse = await fetch(url);
    const data = await dataResponse.json();
    const cleanData = await _cleanData(data);
    return cleanData;
}

async function _cleanData(data) { 
   return data.map(car => ({
        mpg: car.Miles_per_Gallon,
        horsepower: car.Horsepower
    })).filter(car => (car.mpg != null && car.horsepower != null));
}

async function paintData(data) {
    const values = data.map(d => ({
        x: d.horsepower,
        y: d.mpg
    }));

    tfvis.render.scatterplot(
        { name: 'Horsepower vs MPG' },
        { values },
        {
            xLabel: 'Horsepower',
            yLabel: 'MPG', 
            height: 300
        }
    );
}

function convertToTensor(data) {
    return tf.tidy(() => {

      tf.util.shuffle(data);
  
      const inputs = data.map(d => d.horsepower)
      const labels = data.map(d => d.mpg);
  
      const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
      const labelTensor = tf.tensor2d(labels, [labels.length, 1]);
  
      const inputMax = inputTensor.max();
      const inputMin = inputTensor.min();  
      const labelMax = labelTensor.max();
      const labelMin = labelTensor.min();
  
      const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
      const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

      return {
        inputs: normalizedInputs,
        labels: normalizedLabels,

        inputMax,
        inputMin,
        labelMax,
        labelMin,
      }
    });  
  }


export { getData, paintData, convertToTensor }