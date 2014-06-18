char buffer[100];

void setup(){
  Serial.begin(9600);
}

void loop(){
  if(Serial.available()){
    int b = Serial.readBytesUntil('\n', buffer, 100);
    Serial.print("Found: ");
    Serial.print(b);
    Serial.print("; Chars: ");
    Serial.println(buffer);

    memset(buffer, 0, sizeof(buffer));
  }

  delay(10);
}
