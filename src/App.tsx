import './App.css';
import { AutoPlay, DynamicInterpolation } from './demos';

function App() {
  return (
    <div className="App">
      {/*
        AutoPlay Demo - plays animation once automatically

        <AutoPlay
          gridSize={10}
          shape="triangle"
          duration={4}
          startOpacity={0.1}
          endOpacity={1}
          targetPosition="center"
          imageWidth="80%"
        />
      */}

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
        initialScale={80}
      />
    </div>
  );
}

export default App;
