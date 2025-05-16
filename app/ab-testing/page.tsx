"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/libs/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Define types for our data
interface ABTestEvent {
  test_id: string;
  variant: 'A' | 'B';
  event_type: 'view' | 'click' | 'conversion';
  event_count: number;
  unique_visitors: number;
}

interface VariantStats {
  views: number;
  clicks: number;
  conversions: number;
  ctr: number;
  conversionRate: number;
}

interface TestResult {
  testId: string;
  variants: {
    A: VariantStats;
    B: VariantStats;
  };
  comparisonData: Array<{
    name: string;
    A: number;
    B: number;
  }>;
  viewsData: Array<{
    name: string;
    value: number;
  }>;
  winner: 'A' | 'B';
}

export default function ABTestingDashboard() {
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data, error } = await supabase
          .from('ab_test_results')
          .select('*');

        if (error) throw error;

        // Process the data for visualization
        const processedData = processResultsData(data as ABTestEvent[]);
        setResults(processedData);
      } catch (err: any) {
        console.error('Error fetching A/B test results:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [supabase]);

  // Process the raw data into a format suitable for charts
  const processResultsData = (data: ABTestEvent[]): TestResult[] | null => {
    if (!data || data.length === 0) return null;

    // Group by test_id and create stats
    const testResults: Record<string, Partial<TestResult>> = {};

    data.forEach(item => {
      if (!testResults[item.test_id]) {
        testResults[item.test_id] = {
          testId: item.test_id,
          variants: {
            A: { views: 0, clicks: 0, conversions: 0, ctr: 0, conversionRate: 0 },
            B: { views: 0, clicks: 0, conversions: 0, ctr: 0, conversionRate: 0 }
          }
        };
      }

      const variant = item.variant;
      const eventType = item.event_type;

      if (eventType === 'view') {
        testResults[item.test_id].variants![variant].views = item.event_count;
      } else if (eventType === 'click') {
        testResults[item.test_id].variants![variant].clicks = item.event_count;
      } else if (eventType === 'conversion') {
        testResults[item.test_id].variants![variant].conversions = item.event_count;
      }
    });

    // Calculate rates and prepare chart data
    const processed = Object.values(testResults).map(test => {
      const variantA = test.variants!.A;
      const variantB = test.variants!.B;

      // Click-through rates (CTR)
      variantA.ctr = variantA.views > 0 ? (variantA.clicks / variantA.views) * 100 : 0;
      variantB.ctr = variantB.views > 0 ? (variantB.clicks / variantB.views) * 100 : 0;

      // Conversion rates
      variantA.conversionRate = variantA.views > 0 ? (variantA.conversions / variantA.views) * 100 : 0;
      variantB.conversionRate = variantB.views > 0 ? (variantB.conversions / variantB.views) * 100 : 0;

      // Prepare chart data
      const comparisonData = [
        { name: 'CTR', A: variantA.ctr, B: variantB.ctr },
        { name: 'Conversion', A: variantA.conversionRate, B: variantB.conversionRate }
      ];

      const viewsData = [
        { name: 'Variant A', value: variantA.views },
        { name: 'Variant B', value: variantB.views }
      ];

      return {
        ...test,
        comparisonData,
        viewsData,
        winner: variantA.conversionRate > variantB.conversionRate ? 'A' : 'B'
      } as TestResult;
    });

    return processed;
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">A/B Testing Dashboard</h1>

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        )}

        {error && (
          <div className="alert alert-error mb-8">
            <p>{error}</p>
          </div>
        )}

        {results && results.length === 0 && (
          <div className="alert alert-info mb-8">
            <p>No A/B test data available yet. Start some tests to see results here.</p>
          </div>
        )}

        {results && results.map(test => (
          <div key={test.testId} className="card bg-base-200 shadow-xl mb-8">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">{test.testId.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>

              <div className="stats shadow mb-6">
                <div className="stat">
                  <div className="stat-title">Total Views</div>
                  <div className="stat-value">{test.variants.A.views + test.variants.B.views}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Variant A CTR</div>
                  <div className="stat-value">{test.variants.A.ctr.toFixed(2)}%</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Variant B CTR</div>
                  <div className="stat-value">{test.variants.B.ctr.toFixed(2)}%</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Winner</div>
                  <div className="stat-value">Variant {test.winner}</div>
                  <div className="stat-desc">
                    {test.winner === 'A' ?
                      `${(test.variants.A.ctr - test.variants.B.ctr).toFixed(2)}% better` :
                      `${(test.variants.B.ctr - test.variants.A.ctr).toFixed(2)}% better`}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Distribution of Views</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={test.viewsData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {test.viewsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Comparison of Metrics</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={test.comparisonData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="A" name="Variant A" fill="#0088FE" />
                        <Bar dataKey="B" name="Variant B" fill="#00C49F" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="divider my-8"></div>

              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Variant A</th>
                      <th>Variant B</th>
                      <th>Difference</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Views</td>
                      <td>{test.variants.A.views}</td>
                      <td>{test.variants.B.views}</td>
                      <td>N/A</td>
                    </tr>
                    <tr>
                      <td>Clicks</td>
                      <td>{test.variants.A.clicks}</td>
                      <td>{test.variants.B.clicks}</td>
                      <td>N/A</td>
                    </tr>
                    <tr>
                      <td>Click-Through Rate</td>
                      <td>{test.variants.A.ctr.toFixed(2)}%</td>
                      <td>{test.variants.B.ctr.toFixed(2)}%</td>
                      <td className={test.variants.A.ctr > test.variants.B.ctr ? 'text-success' : 'text-error'}>
                        {test.variants.A.ctr > test.variants.B.ctr ? '+' : ''}{(test.variants.A.ctr - test.variants.B.ctr).toFixed(2)}%
                      </td>
                    </tr>
                    <tr>
                      <td>Conversions</td>
                      <td>{test.variants.A.conversions}</td>
                      <td>{test.variants.B.conversions}</td>
                      <td>N/A</td>
                    </tr>
                    <tr>
                      <td>Conversion Rate</td>
                      <td>{test.variants.A.conversionRate.toFixed(2)}%</td>
                      <td>{test.variants.B.conversionRate.toFixed(2)}%</td>
                      <td className={test.variants.A.conversionRate > test.variants.B.conversionRate ? 'text-success' : 'text-error'}>
                        {test.variants.A.conversionRate > test.variants.B.conversionRate ? '+' : ''}{(test.variants.A.conversionRate - test.variants.B.conversionRate).toFixed(2)}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
} 