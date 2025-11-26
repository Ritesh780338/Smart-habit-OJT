import React from 'react';
import { View } from 'react-native';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory-native';

interface WeeklyBarChartProps {
  data: { day: string; value: number }[];
}

export const WeeklyBarChart: React.FC<WeeklyBarChartProps> = ({ data }) => {
  return (
    <View>
      <VictoryChart theme={VictoryTheme.material} domainPadding={{ x: 20 }}>
        <VictoryAxis />
        <VictoryAxis dependentAxis />
        <VictoryBar data={data} x="day" y="value" />
      </VictoryChart>
    </View>
  );
};


