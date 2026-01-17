import './App.css';
import { AutoPlay, DynamicInterpolation } from './demos';

function App() {
  return (
    <div className="App">
      {/* <AutoPlay
        gridSize={10}
        shape="square"
        duration={4}
        startOpacity={0.1}
        endOpacity={1}
        targetPosition="center"
        imageWidth={"40%"}
      /> */}
      {/*
        DynamicInterpolation Demo - control animation with sliders
      */}
      
      <DynamicInterpolation
        gridSize={10}
        initialShape="square"
        initialAnimationState={0}
        initialStartOpacity={0.1}
        initialEndOpacity={1}
        initialPositionX={50}
        initialPositionY={50}
        initialScale={50}
      />
    </div>
  );
}

export default App;
