char buffer[100];
int pirPin = 7;
int pirVal;

void setup(){
  pinMode(pirPin, INPUT);
  Serial.begin(9600);
}

void loop(){
  if(Serial.available()){
    memset(buffer, 0, sizeof(buffer));
    int b = Serial.readBytesUntil('\n', buffer, 100);
    Serial.print("Found: ");
    Serial.print(b);
    Serial.print("; Chars: ");
    Serial.println(buffer);
  }

  int isPir = strcmp(buffer, "pir");

  if(isPir == 0){
    pirVal = digitalRead(pirPin);
    Serial.print("PIR: ");
    Serial.println(pirVal);
    delay(250);
  }

  delay(10);
}
