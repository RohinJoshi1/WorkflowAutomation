import {Kafka} from 'kafkajs';
import { PrismaClient } from '@prisma/client';

const client =  new PrismaClient() 
const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092'],
}) 
const TOPIC = 'zap_events'
async function main(){
    const producer = kafka.producer()
    await producer.connect()
    while(1){
        const outbox = await client.zapRunOutbox.findMany({
            where:{},
            take: 10,
        })
        await producer.send({
            topic: TOPIC,
            messages: outbox.map(outbox => ({
                value: JSON.stringify({zapRunId: outbox.zapRunId,stage:0}),
            })),
        })
        await client.zapRunOutbox.deleteMany({
            where: {
                id: {
                    in: outbox.map(outbox => outbox.id)
                }
            }
        })
        await new Promise(resolve => setTimeout(resolve, 1000))
       
    }
}
main()