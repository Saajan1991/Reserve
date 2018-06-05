import { HttpClientModule } from '@angular/common/http';
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
    // alert(fileName);
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
              "type": "FACE_DETECTION"
            }
          ]
        }
      ]
    };
    //http post request to google api using API Key and request json
    try{
      let response = this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + environment.firebaseConfig.googleCloudVisionAPIKey, body);
      return response;
    }
    catch(e){
      console.log(e);
    }
  }

  //label detection google api
  getLabels(base64Image) {
    let body = {
      "requests": [
        {
          "image": {
            "content": base64Image
          },
          "features": [
            {
              "type": "LABEL_DETECTION"
            }
          ]
        }
      ]
    }
    let response = this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + environment.firebaseConfig.googleCloudVisionAPIKey, body);
    if (response) {
      alert("Response from google");
    }
    else {
      alert("Error");
    }
    return response;
  }
}
