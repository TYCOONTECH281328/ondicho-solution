import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  FlatList,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [loading, setLoading] = useState(false);

  const MPESA_TILL = '4773289';
  const WHATSAPP_NUMBER = '+254714104723';

  const offers = {
    data: [
      { id: 1, size: '1.5GB', duration: '3 HRS', price: 50 },
      { id: 2, size: '350MB', duration: '7 DAYS', price: 49 },
      { id: 3, size: '2.5GB', duration: '7 DAYS', price: 300 },
      { id: 4, size: '6GB', duration: '7 DAYS', price: 700 },
      { id: 5, size: '1GB', duration: '1 HR', price: 19 },
      { id: 6, size: '250MB', duration: '24 HRS', price: 20 },
      { id: 7, size: '1GB', duration: '24 HRS', price: 99 },
      { id: 8, size: '1.25GB', duration: 'Until Midnight', price: 55 },
    ],
    minutes: [
      { id: 1, mins: '20 MINS', duration: '3 HRS', price: 21 },
      { id: 2, mins: '20 MINS', duration: '3 HRS', price: 22 },
      { id: 3, mins: '50 MINS', duration: 'Until Midnight', price: 51 },
      { id: 4, mins: '50 MINS', duration: '2 HRS', price: 31 },
      { id: 5, mins: '43 MINS', duration: '3 HRS', price: 24 },
    ],
    sms: [
      { id: 1, sms: '20 SMS', duration: 'Daily Unlimited', price: 5 },
      { id: 2, sms: '200 SMS', duration: 'Daily Unlimited', price: 10 },
      { id: 3, sms: '1000 SMS', duration: 'Weekly', price: 30 },
      { id: 4, sms: '1500 SMS', duration: 'Weekly', price: 105 },
      { id: 5, sms: '3500 SMS', duration: 'Monthly', price: 210 },
    ],
  };

  const handleOrder = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    if (!phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }
    if (!selectedOffer) {
      Alert.alert('Error', 'Please select an offer');
      return;
    }

    setLoading(true);

    try {
      const message = `Hello ONDICHO SOLUTION,%0A%0AI want to order:%0A${selectedOffer}%0A%0AName: ${name}%0APhone: ${phone}`;
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${message}`;

      await Linking.openURL(whatsappUrl);

      Alert.alert('Success', 'Opening WhatsApp...');
      setName('');
      setPhone('');
      setSelectedOffer(null);
    } catch (error) {
      Alert.alert('Error', 'Could not open WhatsApp');
    } finally {
      setLoading(false);
    }
  };

  const renderOfferCard = (offer, type) => {
    let displayText = '';
    if (type === 'data') displayText = `${offer.size} - ${offer.duration}`;
    if (type === 'minutes') displayText = `${offer.mins} - ${offer.duration}`;
    if (type === 'sms') displayText = `${offer.sms} - ${offer.duration}`;

    return (
      <TouchableOpacity
        key={offer.id}
        style={[
          styles.offerCard,
          selectedOffer === displayText && styles.offerCardSelected,
        ]}
        onPress={() => setSelectedOffer(displayText)}
      >
        <Text style={styles.offerTitle}>
          {type === 'data' ? offer.size : type === 'minutes' ? offer.mins : offer.sms}
        </Text>
        <Text style={styles.offerDuration}>{offer.duration}</Text>
        <Text style={styles.offerPrice}>KSh {offer.price}</Text>
      </TouchableOpacity>
    );
  };

  const HomeScreen = () => (
    <ScrollView style={styles.screenContainer}>
      <LinearGradient
        colors={['#0066ff', '#00c6ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>📡 ONDICHO SOLUTION</Text>
        <Text style={styles.headerSubtitle}>Fast Data • Minutes • SMS</Text>
      </LinearGradient>

      <View style={styles.contentContainer}>
        <View style={styles.mpesaBox}>
          <Text style={styles.mpesaLabel}>💳 M-Pesa Till</Text>
          <Text style={styles.mpesaNumber}>{MPESA_TILL}</Text>
          <Text style={styles.mpesaNote}>Buy Goods & Services</Text>
        </View>

        <View style={styles.featuresBox}>
          <Text style={styles.sectionTitle}>✅ Why Choose Us?</Text>
          <Text style={styles.featureItem}>✔ Instant Activation</Text>
          <Text style={styles.featureItem}>✔ Affordable Packages</Text>
          <Text style={styles.featureItem}>✔ 24/7 Support</Text>
          <Text style={styles.featureItem}>✔ Secure Transactions</Text>
        </View>

        <View style={styles.contactBox}>
          <Text style={styles.sectionTitle}>📞 Contact Us</Text>
          <Text style={styles.contactText}>Phone: 0790329385</Text>
          <Text style={styles.contactText}>WhatsApp: {WHATSAPP_NUMBER}</Text>
        </View>
      </View>
    </ScrollView>
  );

  const OffersScreen = () => (
    <ScrollView style={styles.screenContainer}>
      <LinearGradient
        colors={['#0066ff', '#00c6ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>🌐 DATA OFFERS</Text>
      </LinearGradient>

      <View style={styles.contentContainer}>
        <View style={styles.offersGrid}>
          {offers.data.map(offer => renderOfferCard(offer, 'data'))}
        </View>

        <LinearGradient
          colors={['#0066ff', '#00c6ff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>📞 MINUTES</Text>
        </LinearGradient>

        <View style={styles.offersGrid}>
          {offers.minutes.map(offer => renderOfferCard(offer, 'minutes'))}
        </View>

        <LinearGradient
          colors={['#0066ff', '#00c6ff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>💬 SMS</Text>
        </LinearGradient>

        <View style={styles.offersGrid}>
          {offers.sms.map(offer => renderOfferCard(offer, 'sms'))}
        </View>
      </View>
    </ScrollView>
  );

  const OrderScreen = () => (
    <ScrollView style={styles.screenContainer}>
      <LinearGradient
        colors={['#0066ff', '#00c6ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>🛒 PLACE ORDER</Text>
      </LinearGradient>

      <View style={styles.contentContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Your Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Selected Offer</Text>
          <View style={styles.selectedOfferBox}>
            <Text style={styles.selectedOfferText}>
              {selectedOffer || 'No offer selected'}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.orderButton, loading && styles.orderButtonDisabled]}
            onPress={handleOrder}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="large" />
            ) : (
              <Text style={styles.orderButtonText}>Order Now via WhatsApp</Text>
            )}
          </TouchableOpacity>

          <View style={styles.instructionsBox}>
            <Text style={styles.instructionsTitle}>📋 How to Order:</Text>
            <Text style={styles.instructionItem}>1. Fill in your details</Text>
            <Text style={styles.instructionItem}>2. Select an offer from the Offers tab</Text>
            <Text style={styles.instructionItem}>3. Tap "Order Now" button</Text>
            <Text style={styles.instructionItem}>4. Complete M-Pesa payment</Text>
            <Text style={styles.instructionItem}>5. Service activates instantly</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {activeTab === 'home' && <HomeScreen />}
      {activeTab === 'offers' && <OffersScreen />}
      {activeTab === 'order' && <OrderScreen />}

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'home' && styles.tabActive]}
          onPress={() => setActiveTab('home')}
        >
          <Text style={styles.tabText}>🏠 Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'offers' && styles.tabActive]}
          onPress={() => setActiveTab('offers')}
        >
          <Text style={styles.tabText}>📊 Offers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'order' && styles.tabActive]}
          onPress={() => setActiveTab('order')}
        >
          <Text style={styles.tabText}>🛒 Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f6ff',
  },
  screenContainer: {
    flex: 1,
    marginBottom: 60,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  contentContainer: {
    padding: 15,
  },
  mpesaBox: {
    backgroundColor: '#fff8dc',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  mpesaLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  mpesaNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff6600',
    marginBottom: 5,
  },
  mpesaNote: {
    fontSize: 12,
    color: '#666',
  },
  featuresBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066ff',
    marginBottom: 12,
  },
  featureItem: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
  contactBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
  offersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  offerCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  offerCardSelected: {
    borderColor: '#0066ff',
    backgroundColor: '#f0f4ff',
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  offerDuration: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  offerPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00aa00',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  selectedOfferBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
    marginTop: 5,
  },
  selectedOfferText: {
    fontSize: 14,
    color: '#666',
  },
  orderButton: {
    backgroundColor: '#25D366',
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  orderButtonDisabled: {
    opacity: 0.6,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructionsBox: {
    backgroundColor: '#f0f4ff',
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0066ff',
    marginBottom: 10,
  },
  instructionItem: {
    fontSize: 12,
    color: '#333',
    marginVertical: 4,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabActive: {
    borderTopWidth: 3,
    borderTopColor: '#0066ff',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
});

export default App;
