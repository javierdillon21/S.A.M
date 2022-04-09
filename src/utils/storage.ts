import { Storage } from 'aws-amplify'
import { generateID } from './helpers'


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
      const newFile = new File([blob], finalFileName, {
        type: 'image/png',
      })
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
