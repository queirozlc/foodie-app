import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { Dimensions, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Carousel from 'react-native-reanimated-carousel'
import { AppStackParamList } from '../../routes/types/app'
import RoleProfileCard from './RoleProfileCard'

type Props = NativeStackScreenProps<AppStackParamList, 'RoleProfileScreen'>

export default function RoleProfileScreen({ route }: Props) {
  const { roles } = route.params
  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height
  const [animationMode] = useState<any>('horizontal-stack')
  const [snapDirection] = useState<'left' | 'right'>('left')

  return (
    <GestureHandlerRootView className="flex-1 justify-center">
      <View>
        <Carousel
          loop={true}
          width={width}
          height={height / 2 + 20}
          autoPlay={false}
          data={roles}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <RoleProfileCard roles={item} height={420} width={width - 100} />
          )}
          mode={animationMode}
          modeConfig={{
            snapDirection,
            stackInterval: 30,
          }}
        />
      </View>
    </GestureHandlerRootView>
  )
}
