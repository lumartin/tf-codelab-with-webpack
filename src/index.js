
import { getData, paintData, convertToTensor } from './data';
import { createModel, paintModel, trainModel } from './train';
import { testModel } from './inference';

import hyperparams from '../hyperparams.json';

async function run() {
    const data = await getData('https://storage.googleapis.com/tfjs-tutorials/carsData.json');
    paintData(data);

    const model = createModel();
    paintModel(model);


    const tensorData = convertToTensor(data);    

    const { inputs, labels } = tensorData;
    await trainModel(model, inputs, labels, hyperparams);

    testModel(model, data, tensorData);
}

document.addEventListener('DOMContentLoaded', run);