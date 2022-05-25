import { Storage } from 'aws-amplify'
import { generateID } from './helpers'
import Compress from "react-image-file-resizer";


export async function sendImage(
  image: string | File,
  fileName?: string
): Promise<{
  success: boolean
  finalFileName: string | undefined
}> {
  var success = false
  var file: File | undefined
  var finalFileName: string | undefined
  
  try {
    finalFileName = fileName || generateID()

    // image is a dataULR
    if (typeof image === 'string') {
      // converting dataURL to file
      const blob = await (await fetch(image)).blob()
     
      console.log('tamaño del archivo sin comprimir: ', blob.size)
      //image size exceeds limit of 400kb
      if(blob.size>=400000){
        console.log('SUBIENDO EN TAMAÑO CON COMPRESION')
        //File compressing
        Compress.imageFileResizer(
          blob,
          480,
          480,
          'JPEG',
          100,
          0,
          async (uri)=>{
            //uri is a kind of DataURL
            const blobcomp= await (await fetch(uri.toString())).blob()
            const compressFile= new File([blobcomp], 'comprimido',{ type:'image/jpg'})
            console.log('tamaño del archivo comprimido',compressFile.size)
            console.log('formato del archivo comprimido',compressFile.type)
            // uploading photo
            await Storage.put(finalFileName as string, compressFile, {
              contentType: 'image/jpg',
            })
          }
        )
      }else{
        console.log('SUBIENDO EN TAMAÑO ORIGINAL SIN COMPRIMIR')
        const newFile = new File([blob], finalFileName as string, {
          type: 'image/jpg',
        })
          // uploading photo
        await Storage.put(finalFileName as string, newFile, {
          contentType: 'image/jpg',
        })
        
      }
     
    }
    // image is a file
    else {
      file = new File([image], finalFileName, {
        type: image.type,
        lastModified: image.lastModified,
      })
    }

    // uploading photo
    
    // await Storage.put(finalFileName, file, {
    //   contentType: 'image/png',
    // })
    
    console.log('File sent with key:', finalFileName)
    success = true
  } catch (error) {
    console.error('Error uploading photo:', error)
    success = false
  }

  return Promise.resolve({
    success,
    finalFileName,
  })
}
