import { skus, store } from "../data/viewer.interface";

addEventListener('message', (event) => {
    const { planningData, storesData, skuData } = event.data;

    // Convert stores and SKUs into lookup objects (faster than Map)
    const storeMap = Object.fromEntries(storesData.map((store: store) => [store.id, store.label]));
    const skuMap = Object.fromEntries(skuData.map((sku: skus) => [sku.id, sku]));

    const chunkSize = 500; // Process in batches
    let index = 0;

    function processChunk() {
        const end = Math.min(index + chunkSize, planningData.length);
        const processedChunk = [];

        for (let i = index; i < end; i++) {
            const entry = planningData[i];
            const store = storeMap[entry.storeId] ?? 'Unknown Store';
            const sku = skuMap[entry.skuId] || { label: 'Unknown SKU', price: 0, cost: 0 };

            processedChunk.push({
                ...entry,
                id: `${entry.storeId}_${entry.skuId}`,
                store,
                sku: sku.label,
                price: sku.price,
                cost: sku.cost
            });
        }

        postMessage({ chunk: processedChunk });

        index += chunkSize;
        if (index < planningData.length) {
            setTimeout(processChunk, 0); // Prevent blocking
        } else {
            postMessage({ done: true }); // Notify completion
        }
    }

    processChunk();
});
