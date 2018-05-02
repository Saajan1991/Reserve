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
