import { skus, store } from "../data/viewer.interface";

describe('Worker: Data Processing', () => {
    let worker: Worker;
  
    beforeEach(() => {
        worker = new Worker(new URL('./row-data.worker', import.meta.url), { type: 'module' });
    });

    afterEach(() => {
        worker.terminate();
    });

    it('should correctly process planning data and send chunks', (done) => {
        const mockPlanningData = [
            { storeId: 'S1', skuId: 'SKU1', quantity: 10 },
            { storeId: 'S2', skuId: 'SKU2', quantity: 15 }
        ];
        
        const mockStoresData: store[] = [
            {
                id: 'S1', label: 'Store A',
                sno: 0,
                city: "",
                state: ""
            },
            {
                id: 'S2', label: 'Store B',
                sno: 0,
                city: "",
                state: ""
            }
        ];

        const mockSkuData: skus[] = [
            {
                id: 'SKU1', label: 'Product 1', price: 100, cost: 50,
                class: "",
                dept: ""
            },
            {
                id: 'SKU2', label: 'Product 2', price: 200, cost: 100,
                class: "",
                dept: ""
            }
        ];

        worker.onmessage = (event: MessageEvent) => {
            expect(event.data).toBeDefined();

            if (event.data.chunk) {
                expect(event.data.chunk.length).toBeGreaterThan(0);
                
                // Fix: Use .hasOwnProperty instead of Jest's .toHaveProperty
                const chunkItem = event.data.chunk[0];
                expect(chunkItem).toBeInstanceOf(Object);
                expect(chunkItem.hasOwnProperty('id')).toBeTruthy();
                expect(chunkItem.hasOwnProperty('store')).toBeTruthy();
                expect(chunkItem.hasOwnProperty('sku')).toBeTruthy();
                expect(chunkItem.hasOwnProperty('price')).toBeTruthy();
                expect(chunkItem.hasOwnProperty('cost')).toBeTruthy();
            } else if (event.data.done) {
                done();
            }
        };

        // Simulate sending a message event
        const messageEvent = new MessageEvent('message', {
            data: { planningData: mockPlanningData, storesData: mockStoresData, skuData: mockSkuData }
        });

        worker.dispatchEvent(messageEvent);
    });
});
