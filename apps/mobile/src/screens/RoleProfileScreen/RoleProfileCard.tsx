import { Image, Text, TouchableOpacity, View } from 'react-native'
import { Role } from '../../models/Role'
const costumerImage = require('../../../assets/costumer.png')
const adminImage = require('../../../assets/admin.png')
const restaurantImage = require('../../../assets/restaurant.png')
const deliveryManImage = require('../../../assets/delivery.png')

interface RoleProfileCardProps {
  roles: Role
  width: number
  height: number
}

export default function RoleProfileCard({
  roles,
  height,
  width,
}: RoleProfileCardProps) {
  const getRolesImage = (roleName: string) => {
    switch (roleName.toLowerCase()) {
      case 'admin':
        return adminImage
      case 'restaurant':
        return restaurantImage
      case 'deliveryman':
        return deliveryManImage
      default:
        return costumerImage
    }
  }

  const rolesImage = {
    ...roles,
    image: getRolesImage(roles.name),
  }

  return (
    <TouchableOpacity
      className="items-center pb-5 px-2 self-center"
      style={{ width, height }}
      activeOpacity={0.75}
    >
      <View className="bg-white rounded-3xl flex-1">
        <Image
          source={rolesImage.image}
          className="flex-1 max-w-[300px]"
          style={{ resizeMode: 'contain' }}
        />
        <View className="bg-yellow-500 rounded-b-3xl p-5 items-center">
          <Text className="font-poppins-semi text-dark-gray-500 text-lg">
            {rolesImage.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
