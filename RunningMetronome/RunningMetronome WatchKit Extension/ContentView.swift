//
//  ContentView.swift
//  RunningMetronome WatchKit Extension
//
//  Created by Nate Stearley on 8/4/22.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        
        ZStack {
            

            Circle().frame(width: 200.0)
            
            Text("140").multilineTextAlignment(.center).padding().font(/*@START_MENU_TOKEN@*/.largeTitle/*@END_MENU_TOKEN@*/).foregroundColor(.black)
            
            HStack {
                
                // Possible left side buttons
//                VStack {
//                    Circle().foregroundColor(.green).frame(width: 30, height: 30).padding(2.0)
//
//                    Spacer()
//
//                    Circle().foregroundColor(.red).frame(width: 30, height: 30).padding(2.0)
//
//                }
                
                Spacer()
                
                VStack {
                    ZStack {
                        Circle().foregroundColor(.green).frame(width: 30, height: 30).padding(2.0)
                        
                        
                    }
                    
                    Spacer()
                    
                    Circle().foregroundColor(.red).frame(width: 30, height: 30).padding(2.0)
                        
                }
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
