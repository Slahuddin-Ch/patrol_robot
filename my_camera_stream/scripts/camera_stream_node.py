import asyncio
import websockets
import os

image_dir = 'images/'

async def send_image(websocket, path):
    while True:
        image_filename = 'service_model_2.png'  
        image_path = os.path.join(image_dir, image_filename)

        if os.path.exists(image_path):
            with open(image_path, 'rb') as image_file:
                image_data = image_file.read()
                await websocket.send(image_data)
        else:
            await websocket.send('Image not found.')

        await asyncio.sleep(0.1) 

start_server = websockets.serve(send_image, '0.0.0.0', 8765) 

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

