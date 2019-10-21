import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  /* all this service does is add a message to the messages array, 
  and clear it */
  messages: string[] = [];
  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

}
