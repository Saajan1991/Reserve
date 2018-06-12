import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GoogleCloudVisionServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GoogleCloudVisionServiceProvider Provider');
  }

  //face detection
  getFaces(file) {
    let fileName = file + ".jpg";
    // let fileName = "people.jpg";
    //format to send request to google api
    let body = {
      "requests": [
        {
          "image": {
            "source": {
              "gcsImageUri": "gs://strange-flame-202622.appspot.com/images/" + fileName
            }
          },
          "features": [
            {
              "type": "LABEL_DETECTION",
              "maxResults": 10
            },
            {
              "type": "FACE_DETECTION",
            }
          ]
        }
      ]
    };
    //http post request to google api using API Key and request json
    try {
      let response = this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + environment.firebaseConfig.googleCloudVisionAPIKey, body);
      return response;
    }
    catch (e) {
      console.log(e);
    }
  }
}
