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
      const newFile = new File([blob], finalFileName as string, {
        type: 'image/png',
      })
      // Compress.imageFileResizer(
      //   blob, // the file from input
      //   480, // width
      //   480, // height
      //   "JPEG", // compress format WEBP, JPEG, PNG
      //   70, // quality
      //   0, // rotation
      //   (uri) => {
      //     // console.log('comprimido: ',uri);
      //     // You upload logic goes here
      //     const newFile = new File([uri as Blob], finalFileName as string, {
      //       type: 'image/png',
      //     })
      //     file = newFile
      //     console.log('el tamaño del archivo comprimido es: ',file.size)
      //   },
      //   "base64" // blob or base64 default base64
      // );
      file = newFile
    }
    // image is a file
    else {
      file = new File([image], finalFileName, {
        type: image.type,
        lastModified: image.lastModified,
      })
    }

    // uploading photo
    
    await Storage.put(finalFileName, file, {
      contentType: 'image/png',
    })

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
