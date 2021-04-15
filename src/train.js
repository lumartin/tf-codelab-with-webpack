
function createModel() {
    let model = tf.sequential();
    
    // Initial architecture
    // model.add(tf.layers.dense({ inputShape: [1], units: 1, useBias: true }));
    // model.add(tf.layers.dense({ units: 1, useBias: true }));

    model.add(tf.layers.dense({ inputShape: [1], units: 20, useBias: true }));
    model.add(tf.layers.dense({ units: 50, activation: 'sigmoid' }));
    model.add(tf.layers.dense({ units: 1, useBias: true }));

    return model;

}

function paintModel(model) {
    tfvis.show.modelSummary({name: 'Model Summary'}, model);
}

async function trainModel(model, inputs, labels, hyperparams) {
    model.compile({
        optimizer: tf.train.adam(),
        loss: tf.losses.meanSquaredError
    });

    return await model.fit(inputs, labels, {
        batchSize: hyperparams.batchSize,
        epochs: hyperparams.epochs,
        shuffle: true,
        callbacks: tfvis.show.fitCallbacks(
          { name: 'Training Performance' },
          ['loss', 'mse'], 
          { height: 200, callbacks: ['onEpochEnd'] }
        )
      });

}

export { createModel, paintModel, trainModel } 