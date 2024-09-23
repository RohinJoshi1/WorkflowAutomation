import {Kafka} from 'kafkajs';

const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092'],
}) 
const TOPIC = 'zap_events'

async function main(){
    const consumer = kafka.consumer({ groupId: 'outbox-processor' })
    await consumer.connect()
    await consumer.subscribe({ topic: TOPIC, fromBeginning: true })
    await consumer.run({
        autoCommit:false,
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                topic,
                partition,
                offset: message.offset,
            })
            await new Promise(resolve => setTimeout(resolve, 1000))
            await consumer.commitOffsets([{
                topic: TOPIC,
                partition: partition,
                offset: message.offset+1,
            }])
        },
    })    
}
main()