import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar as CalendarIcon, Clock } from 'lucide-react';

const ScheduleManagement = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [shifts, setShifts] = useState([]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Schedule Management</CardTitle>
              <CardDescription>
                Plan and manage employee work schedules
              </CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Shift
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-1">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </div>

            {/* Schedule View */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">
                  Schedule for {selectedDate?.toLocaleDateString()}
                </h3>
                
                <div className="space-y-3">
                  {/* Sample shifts - replace with real data */}
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">No shifts scheduled</h4>
                        <p className="text-sm text-muted-foreground">
                          Create your first shift to get started
                        </p>
                      </div>
                      <Badge variant="outline">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        Empty
                      </Badge>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Shift for This Day
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Time Tracking</CardTitle>
          <CardDescription>
            Monitor real-time attendance and time entries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No active time entries</p>
            <p className="text-sm">Time tracking will appear here when employees clock in</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleManagement;