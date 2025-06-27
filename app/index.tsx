import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowRight, BarChart3, Shield, Wrench } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';


export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Glowing Background Circles */}
      <LinearGradient
        colors={['#3B82F6', '#9333EA']}
        style={[styles.glowCircle, styles.circleTopLeft]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <LinearGradient
        colors={['#8B5CF6', '#3B82F6']}
        style={[styles.glowCircle, styles.circleBottomRight]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
      />

      {/* Main content */}
      <View style={styles.content}>
        <Text style={styles.heading}>Welcome to</Text>
        <Text style={styles.title}>Service.Care</Text>
        <Text style={styles.subtitle}>
          Track every service, repair, and milestone in one organized place
        </Text>

        {/* Feature blocks */}
        <View style={styles.features}>
          <FeatureCard icon={<Wrench color="#60A5FA" size={32} />} title="Service Tracking" desc="Never miss a maintenance schedule" />
          <FeatureCard icon={<Shield color="#C084FC" size={32} />} title="Secure Records" desc="Keep all your data safe and organized" />
          <FeatureCard icon={<BarChart3 color="#34D399" size={32} />} title="Smart Analytics" desc="Insights into your vehicle health" />
        </View>

        {/* CTA button */}
        <Pressable style={styles.button} onPress={() => router.push('/vehicle-list')}>
          <Text style={styles.buttonText}>Get Started</Text>
          <ArrowRight color="white" size={18} style={{ marginLeft: 6 }} />
        </Pressable>
      </View>
    </View>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <View style={styles.featureCard}>
      {icon}
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDesc}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowCircle: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.2,
  },
  circleTopLeft: {
    width: 80,
    height: 80,
    top: 100,
    left: 30,
  },
  circleBottomRight: {
    width: 100,
    height: 100,
    bottom: 50,
    right: 30,
  },
  content: {
    zIndex: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  heading: {
    fontSize: 26,
    color: '#ffffff',
    fontWeight: '600',
  },
  title: {
    fontSize: 40,
    color: '#60A5FA',
    fontWeight: '900',
    marginTop: 4,
    marginBottom: 12,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: 320,
  },
  features: {
    width: '100%',
    gap: 16,
    marginBottom: 36,
  },
  featureCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderColor: '#333',
    borderWidth: 1,
  },
  featureTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 4,
  },
  featureDesc: {
    color: '#aaa',
    fontSize: 13,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4F46E5',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#60A5FA',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
